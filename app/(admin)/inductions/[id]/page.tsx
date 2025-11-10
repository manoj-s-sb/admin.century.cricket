"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Target,
  Users,
  Video,
  BookOpen,
  CheckCircle,
  AlertCircle,
  CreditCard,
  DollarSign,
  TrendingUp,
  Activity,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Loader2,
} from "lucide-react";
import { mockMembers, Member, CompletedBooking, InductionBooking } from "@/app/lib/mockData";
import { getInductionList, getMemberDetails, updateInductionSteps } from "../services";
import { ToastContainer, Toast } from "@/app/components/Toast";

export default function MemberDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedBookings, setExpandedBookings] = useState<Set<string>>(new Set());
  const [expandedInductions, setExpandedInductions] = useState<Set<string>>(new Set());
  const [completedSteps, setCompletedSteps] = useState<Record<string, Set<number>>>({});
  const [expandedSteps, setExpandedSteps] = useState<Record<string, Set<number>>>({});
  const [inductionStepsList, setInductionStepsList] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [inductionLoading, setInductionLoading] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const fetchMemberDetails = async () => {
      try {
        setLoading(true);
        const memberId = params.id
        const response = await getMemberDetails(memberId);
        console.log(response, "response");
        
        // Update member state with the response data
        // Adjust this based on the actual response structure from your API
        if (response && response.data) {
          setMember(response.data?.documents[0]);
        } else if (response) {
          setMember(response);
        } else {
          // Fallback to mock data if API fails
          const foundMember = mockMembers.find((m) => m.id === parseInt(memberId as string));
          if (foundMember) {
            setMember(foundMember);
          }
        }
      } catch (error) {
        console.error("Error fetching member details:", error);
        // Fallback to mock data on error
        const memberId = parseInt(params.id as string);
        const foundMember = mockMembers.find((m) => m.id === memberId);
        if (foundMember) {
          setMember(foundMember);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchMemberDetails();
  }, [params.id]);

  const toggleBookingExpansion = (bookingId: string) => {
    const newExpanded = new Set(expandedBookings);
    if (newExpanded.has(bookingId)) {
      newExpanded.delete(bookingId);
    } else {
      newExpanded.add(bookingId);
    }
    setExpandedBookings(newExpanded);
  };

  const toggleInductionExpansion = (inductionId: string) => {
    const newExpanded = new Set(expandedInductions);
    if (newExpanded.has(inductionId)) {
      newExpanded.delete(inductionId);
    } else {
      newExpanded.add(inductionId);
    }
    setExpandedInductions(newExpanded);
  };

  const toggleStepCompletion = (inductionId: string, stepIndex: number) => {
    setCompletedSteps(prev => {
      const newCompleted = { ...prev };
      if (!newCompleted[inductionId]) {
        newCompleted[inductionId] = new Set();
      }
      const stepSet = new Set(newCompleted[inductionId]);
      if (stepSet.has(stepIndex)) {
        stepSet.delete(stepIndex);
      } else {
        stepSet.add(stepIndex);
      }
      newCompleted[inductionId] = stepSet;
      return newCompleted;
    });
  };

 
  const toggleSelectAll = (inductionId: string, totalSteps: number) => {
    setCompletedSteps(prev => {
      const newCompleted = { ...prev };
      const currentSteps = newCompleted[inductionId] || new Set<number>();
      const allSelected = currentSteps.size === totalSteps;
      
      if (allSelected) {
        // Deselect all
        newCompleted[inductionId] = new Set<number>();
      } else {
        // Select all
        const allStepsSet = new Set<number>();
        for (let i = 0; i < totalSteps; i++) {
          allStepsSet.add(i);
        }
        newCompleted[inductionId] = allStepsSet;
      }
      return newCompleted;
    });
  };

  useEffect(() => {
    const fetchInductionList = async () => {
      try {
        setInductionLoading(true);
        const response = await getInductionList({userId: params.id as string});
        console.log(response, "getInductionList response");
        // getInductionList already returns response.data, so use response directly
        // If the API returns { data: {...} }, use response.data, otherwise use response
        setInductionStepsList(response?.data || response);
      } catch (error) {
        console.error("Error fetching induction list:", error);
      } finally {
        setInductionLoading(false);
      }
    };
    fetchInductionList();
  }, [params.id]);

  console.log(inductionStepsList, "inductionStepsList");

  const addToast = (message: string, type: "success" | "error" | "info" = "info") => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleSaveInductionSteps = async (inductionId: string) => {
    try {
      setSaving(true);
      const inductionSteps = (inductionStepsList?.subSteps || inductionStepsList?.data?.subSteps || []) as any[];
      const completedStepsForInduction = completedSteps[inductionId] || new Set<number>();
      
      // Create array of objects with step id and status
      const stepsPayload = inductionSteps.map((step, stepIndex) => {
        const isChecked = completedStepsForInduction.has(stepIndex);
        const isAlreadyCompleted = step?.status === "completed";
        return {
          id: step.id as string,
          status: (isChecked || isAlreadyCompleted ? "completed" : "pending") as "completed" | "pending"
        };
      });

      // Get userId from member or params
      const userId = (member as any)?._id || (member as any)?.id || params.id;

      // Call the API
      await updateInductionSteps({
        userId: params.id as string,
        inductionId: inductionId,
        subSteps: stepsPayload
      }).then(async (res) => {
        setInductionLoading(true);
        try {
          const response = await getInductionList({ userId: params.id as string });
          setInductionStepsList(response?.data || response);
        } catch (err) {
          console.error("Error fetching updated induction list:", err);
        } finally {
          setInductionLoading(false);
        }
      }).catch((err) => {
        console.error("Error saving induction steps:", err);
      });
      
      // Check if all steps are completed
      const allStepsCompleted = stepsPayload.every((step) => step.status === "completed");
      
      if (allStepsCompleted) {
        addToast("Induction completed!", "success");
      } else {
        addToast("Induction steps saved successfully!", "success");
      }
    } catch (error) {
      console.error("Error saving induction steps:", error);
      addToast("Failed to save induction steps. Please try again.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Induction Bookings
          </button>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Member Not Found
          </h1>
          <p className="text-gray-600 text-sm">
            The member you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  // Helper functions to extract data from API response structure
  const getMemberName = () => {
    const apiMember = member as any;
    if (apiMember.firstName || apiMember.lastName) {
      return `${apiMember.firstName || ""} ${apiMember.lastName || ""}`.trim();
    }
    return (member as any).name || "N/A";
  };

  const getMemberEmail = () => {
    const apiMember = member as any;
    return apiMember.userProfile?.email || apiMember.email || "N/A";
  };

  const getMemberPhone = () => {
    const apiMember = member as any;
    return apiMember.userProfile?.phone || apiMember.phone || "N/A";
  };

  const getMemberCenter = () => {
    const apiMember = member as any;
    return apiMember.facilityCode || apiMember.center || "N/A";
  };

  const getMemberJoinDate = () => {
    const apiMember = member as any;
    if (apiMember.createdAt) {
      try {
        return new Date(apiMember.createdAt).toLocaleDateString();
      } catch {
        return apiMember.createdAt;
      }
    }
    return apiMember.joinDate || "N/A";
  };

  const getMemberType = () => {
    const apiMember = member as any;
    if (apiMember.userType && Array.isArray(apiMember.userType) && apiMember.userType.length > 0) {
      return apiMember.userType[0];
    }
    if (apiMember.subscription?.subscriptionCode) {
      return apiMember.subscription.subscriptionCode;
    }
    return apiMember.membership || "N/A";
  };

  const getMemberStatus = () => {
    const apiMember = member as any;
    const status = apiMember.status || "N/A";
    return status === "active" ? "Active" : status === "inactive" ? "Inactive" : status;
  };

  const getMembershipColor = (membership: string) => {
    switch (membership) {
      case "Premium":
        return "bg-amber-100 text-amber-800 border border-amber-200";
      case "Standard":
        return "bg-blue-100 text-blue-800 border border-blue-200";
      case "Night Owl":
        return "bg-purple-100 text-purple-800 border border-purple-200";
      case "Tour Only":
        return "bg-orange-100 text-orange-800 border border-orange-200";
      case "Completed Tour":
        return "bg-green-100 text-green-800 border border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-200";
    }
  };

  console.log(member, "member");

  const renderSubscriptionInfo = () => {
    // Access subscription from the API response
    const subscription = (member as any).subscription;
    console.log(subscription, "subscription");
    
    if (!subscription) {
      return (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm">
          <div className="p-3 bg-gray-200 rounded-full w-fit mx-auto mb-4">
            <CreditCard className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Subscription Information</h3>
          <p className="text-gray-600 text-sm">Subscription details are not available for this member.</p>
        </div>
      );
    }

    const formatDate = (dateString: string | null) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleDateString();
      } catch {
        return dateString;
      }
    };

    const formatDateTime = (dateString: string | null) => {
      if (!dateString) return "N/A";
      try {
        return new Date(dateString).toLocaleString();
      } catch {
        return dateString;
      }
    };

    return (
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <CreditCard className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Subscription Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Subscription Code</p>
            <p className="text-base font-semibold text-gray-900 capitalize">{subscription.subscriptionCode || "N/A"}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Status</p>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
              subscription.status === "active" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}>
              {subscription.status || "N/A"}
            </span>
          </div>
          
          {subscription.billing && (
            <>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Current Period Start</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(subscription.billing.currentPeriodStart)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Current Period End</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(subscription.billing.currentPeriodEnd)}
                </p>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Next Billing Date</p>
                <p className="text-base font-semibold text-gray-900">
                  {formatDate(subscription.billing.nextBillingDate)}
                </p>
              </div>
              {subscription.billing.default?.pricing && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Pricing</p>
                  <p className="text-base font-semibold text-gray-900 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    {subscription.billing.default.pricing.amount} {subscription.billing.default.pricing.currency?.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {subscription.billing.default.pricing.frequency}
                  </p>
                </div>
              )}
              {subscription.billing.default?.billingCycle && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Billing Cycle</p>
                  <p className="text-base font-semibold text-gray-900 capitalize">
                    {subscription.billing.default.billingCycle}
                  </p>
                </div>
              )}
            </>
          )}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Prepaid Status</p>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
              subscription.prepaidStatus === "payment_confirmed" 
                ? "bg-green-100 text-green-800 border border-green-200" 
                : "bg-gray-100 text-gray-800 border border-gray-200"
            }`}>
              {subscription.prepaidStatus ? subscription.prepaidStatus.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()) : "N/A"}
            </span>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Awaiting Induction</p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                subscription.awaitingInduction 
                  ? "bg-orange-100 text-orange-800 border border-orange-200" 
                  : "bg-green-100 text-green-800 border border-green-200"
              }`}>
                {subscription.awaitingInduction ? "Yes" : "No"}
              </span>
              
            </div>
          </div>
        </div>

        {/* Onboarding Section */}
        {subscription.onboarding && (
          <div className="mt-6 pt-6 border-t border-gray-300">
            <h4 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-gray-600" />
              Onboarding
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Completed Onboarding</p>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                  subscription.onboarding.completedOnboarding 
                    ? "bg-green-100 text-green-800 border border-green-200" 
                    : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}>
                  {subscription.onboarding.completedOnboarding ? "Yes" : "No"}
                </span>
              </div>
              {subscription.onboarding.completedOnboardingOn && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Completed On</p>
                  <p className="text-base font-semibold text-gray-900">
                    {formatDateTime(subscription.onboarding.completedOnboardingOn)}
                  </p>
                </div>
              )}
              {subscription.onboarding.staffName && (
                <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">Staff Name</p>
                  <p className="text-base font-semibold text-gray-900">
                    {subscription.onboarding.staffName}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCompletedBookings = () => {
    if (!member.completedBookings || member.completedBookings.length === 0) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-900 mb-2">No Bookings Yet</h3>
          <p className="text-gray-600 text-sm">This member hasn't completed any bookings yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-200 rounded-lg">
            <BookOpen className="h-5 w-5 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Completed Bookings ({member.completedBookings.length})
          </h3>
        </div>
        
        <div className="space-y-3">
          {member.completedBookings.map((booking: CompletedBooking, index: number) => {
            const isExpanded = expandedBookings.has(booking.bookingId);
            return (
              <div key={booking.bookingId} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
                {/* Booking Header - Always Visible */}
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleBookingExpansion(booking.bookingId)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-200 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Booking #{booking.bookingId}</h4>
                      <p className="text-gray-600 text-xs">{booking.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      <CheckCircle className="h-3 w-3" />
                      Completed
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {/* Expandable Details */}
                {isExpanded && (
                  <div className="border-t border-gray-200 p-4 bg-gray-50">
                    {/* Session Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Lane</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.laneBooked}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Duration</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.laneDetails.duration}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Coach</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.laneDetails.coachAssigned || "Not assigned"}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Type</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.laneDetails.laneType}</p>
                      </div>
                    </div>

                    {/* Time Details */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Entry Time</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.entryTime}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-xs font-medium text-gray-500 mb-1">Exit Time</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.exitTime}</p>
                      </div>
                    </div>

                    {/* Ball Details */}
                    {booking.ballDetails && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <Target className="h-4 w-4 text-gray-500" />
                          Ball Details
                        </h5>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Type</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.ballDetails.ballType}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Count</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.ballDetails.ballCount}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Condition</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.ballDetails.ballCondition}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Member Details */}
                    {booking.memberDetails && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-gray-500" />
                          Session Details
                        </h5>
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Accompanying</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.memberDetails.membersAccompanying} members</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Experience</p>
                            <p className="text-sm font-semibold text-gray-900">{booking.memberDetails.experienceLevel}</p>
                          </div>
                        </div>
                        {booking.memberDetails.memberNames && booking.memberDetails.memberNames.length > 0 && (
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Member Names</p>
                            <p className="text-xs text-gray-900">{booking.memberDetails.memberNames.join(", ")}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Performance Metrics */}
                    {booking.performanceMetrics && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <TrendingUp className="h-4 w-4 text-gray-500" />
                          Performance Metrics
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                          {booking.performanceMetrics.ballsBowled && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Balls Bowled</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.performanceMetrics.ballsBowled}</p>
                            </div>
                          )}
                          {booking.performanceMetrics.ballsBatted && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Balls Batted</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.performanceMetrics.ballsBatted}</p>
                            </div>
                          )}
                          {booking.performanceMetrics.accuracy && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Accuracy</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.performanceMetrics.accuracy}</p>
                            </div>
                          )}
                          {booking.performanceMetrics.speed && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Speed</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.performanceMetrics.speed}</p>
                            </div>
                          )}
                          {booking.performanceMetrics.technique && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Technique</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.performanceMetrics.technique}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Session Notes */}
                    {booking.sessionNotes && (
                      <div className="mb-4">
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <Activity className="h-4 w-4 text-gray-500" />
                          Session Notes
                        </h5>
                        <div className="bg-white rounded-lg p-3 border border-gray-200">
                          <p className="text-xs text-gray-900">{booking.sessionNotes}</p>
                        </div>
                      </div>
                    )}

                    {/* Camera Details */}
                    {booking.camDetails && (
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                          <Video className="h-4 w-4 text-gray-500" />
                          Recording Details
                        </h5>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-white rounded-lg p-3 border border-gray-200">
                            <p className="text-xs font-medium text-gray-500 mb-1">Camera</p>
                            <p className="text-sm font-semibold text-gray-900">
                              {booking.camDetails.camInstalled ? "Installed" : "Not installed"}
                            </p>
                          </div>
                          {booking.camDetails.highlightsGenerated && (
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <p className="text-xs font-medium text-gray-500 mb-1">Highlights</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {booking.camDetails.highlightsGenerated ? "Generated" : "Not generated"}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };


  const renderInductionBookings = () => {
      const inductionSteps = (inductionStepsList?.subSteps || inductionStepsList?.data?.subSteps || []) as any[];
    // Use a default induction ID if no bookings exist
    const defaultInductionId = "default";
    const hasBookings = member.inductionBookings && member.inductionBookings.length > 0;
    const inductionId = hasBookings && member.inductionBookings ? member.inductionBookings[0].inductionId : defaultInductionId;
    
    const isInductionExpanded = expandedInductions.has(inductionId);
    const inductionCompletedSteps = completedSteps[inductionId] || new Set<number>();
    const inductionExpandedSteps = expandedSteps[inductionId] || new Set<number>();
    
    // Calculate actual completed steps count (including API completed status and manually checked)
    const actualCompletedCount = inductionSteps.reduce((count, step, stepIndex) => {
      const isStatusCompleted = step?.status === "completed";
      const isUserChecked = inductionCompletedSteps.has(stepIndex);
      return (isStatusCompleted || isUserChecked) ? count + 1 : count;
    }, 0);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-100 rounded-lg">
            <GraduationCap className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">
            Attending Induction
          </h3>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          {/* Induction Header */}
          <div 
            className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl"
            onClick={() => toggleInductionExpansion(inductionId)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">Induction Steps</h4>
                {hasBookings && member.inductionBookings && member.inductionBookings.length > 0 && (
                  <p className="text-gray-600 text-xs mt-0.5">
                    {member.inductionBookings[0].scheduledDate} at {member.inductionBookings[0].scheduledTime}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {inductionLoading ? (
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                  {actualCompletedCount} of {inductionSteps.length} steps completed
                </span>
              )}
              {isInductionExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </div>
          
          {/* Loading State */}
          {inductionLoading && (
            <div className="border-t border-gray-200 p-8 bg-gradient-to-br from-gray-50 to-white">
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-4" />
                <p className="text-sm font-medium text-gray-600">Loading induction steps...</p>
              </div>
            </div>
          )}
          
          {/* Induction Steps */}
          {isInductionExpanded && !inductionLoading && (
            <div className="border-t border-gray-200 p-5 bg-gradient-to-br from-gray-50 to-white">
              <div className="space-y-3 mb-6">
                {inductionSteps.map((step, stepIndex) => {
                  console.log(step?.status, "step");
                  const isStatusCompleted = step?.status === "completed";
                  const isUserChecked = inductionCompletedSteps.has(stepIndex);
                  // If status is "completed", always checked; otherwise use user's manual selection
                  const isStepCompleted = isStatusCompleted || isUserChecked;

                  return (
                    <div 
                      key={stepIndex} 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-center gap-4 p-4">
                        {/* Custom Checkbox */}
                        <label className="relative flex items-center cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={isStepCompleted}
                            disabled={isStatusCompleted}
                            onChange={() => {
                              // Only allow toggling if status is not "completed"
                              if (!isStatusCompleted) {
                                toggleStepCompletion(inductionId, stepIndex);
                              }
                            }}
                            className="sr-only"
                          />
                          <div className={`flex items-center justify-center w-5 h-5 rounded border-2 transition-all duration-200 ${
                            isStepCompleted
                              ? "bg-blue-600 border-blue-600"
                              : "bg-white border-gray-300 group-hover:border-blue-400"
                          } ${isStatusCompleted ? "opacity-75" : ""}`}>
                            {isStepCompleted && (
                              <CheckCircle className="h-3.5 w-3.5 text-white" />
                            )}
                          </div>
                        </label>

                        {/* Step Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h5 className="text-sm font-semibold text-gray-900">
                                  {step.id?.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (str:any) => str.toUpperCase())}
                                </h5>
                                {isStatusCompleted && (
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                                    Completed
                                  </span>
                                )}
                              </div>
                            </div> 
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Progress Summary */}
              <div className="mb-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-gray-900">
                    {actualCompletedCount} / {inductionSteps.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all duration-500 shadow-sm"
                    style={{
                      width: `${inductionSteps.length > 0 ? (actualCompletedCount / inductionSteps.length) * 100 : 0}%`
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-200 flex items-center justify-between gap-3">
                <label className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                  <input
                    type="checkbox"
                    checked={actualCompletedCount === inductionSteps.length && inductionSteps.length > 0}
                    onChange={() => toggleSelectAll(inductionId, inductionSteps.length)}
                    className="sr-only"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <div className={`flex items-center justify-center w-4 h-4 rounded border-2 transition-all ${
                    actualCompletedCount === inductionSteps.length && inductionSteps.length > 0
                      ? "bg-blue-600 border-blue-600"
                      : "bg-white border-gray-400"
                  }`}>
                    {actualCompletedCount === inductionSteps.length && inductionSteps.length > 0 && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span>Select All</span>
                </label>
                
                <button
                  onClick={() => handleSaveInductionSteps(inductionId)}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-700"
                >
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSubscriptionDetails = () => {
    return (
      <div className="space-y-6">
        {renderSubscriptionInfo()}
        {renderInductionBookings()}
      </div>
    );
  };

  const renderTourDetails = () => {
    if (!member.tourDetails) {
      return (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <AlertCircle className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-gray-900 mb-2">No Tour Details</h3>
          <p className="text-gray-600 text-sm">Tour details are not available for this member.</p>
        </div>
      );
    }

    const isCompletedTour = member.relationshipType === "Prospect";

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-gray-200 rounded-lg">
            {isCompletedTour ? (
              <CheckCircle className="h-5 w-5 text-gray-600" />
            ) : (
              <Clock className="h-5 w-5 text-gray-600" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            {isCompletedTour ? "Completed Tour Details" : "Upcoming Tour Details"}
          </h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">Tour Date</p>
              <p className="text-sm font-semibold text-gray-900">
                {isCompletedTour ? member.completedTourDate : member.tourDate}
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">Entry Time</p>
              <p className="text-sm font-semibold text-gray-900">{member.tourDetails.entryTime}</p>
            </div>
            {isCompletedTour && member.tourDetails.exitTime && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-1">Exit Time</p>
                <p className="text-sm font-semibold text-gray-900">{member.tourDetails.exitTime}</p>
              </div>
            )}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <p className="text-xs font-medium text-gray-500 mb-1">Lane</p>
              <p className="text-sm font-semibold text-gray-900">{member.tourDetails.laneBooked}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Lane Details</p>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  {member.tourDetails.laneDetails.laneType}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-800">
                  {member.tourDetails.laneDetails.duration}
                </span>
              </div>
            </div>

            {member.tourDetails.laneDetails.coachAssigned && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-1">Coach</p>
                <p className="text-sm font-semibold text-gray-900">{member.tourDetails.laneDetails.coachAssigned}</p>
              </div>
            )}

            {member.tourDetails.memberDetails && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-1">Accompanying Members</p>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  {member.tourDetails.memberDetails.membersAccompanying} members
                </p>
                {member.tourDetails.memberDetails.memberNames && (
                  <p className="text-xs text-gray-600">
                    {member.tourDetails.memberDetails.memberNames.join(", ")}
                  </p>
                )}
              </div>
            )}

            {member.tourDetails.performanceMetrics && isCompletedTour && (
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-gray-500" />
                  Performance Metrics
                </h5>
                <div className="grid grid-cols-3 gap-3">
                  {member.tourDetails.performanceMetrics.ballsBowled && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-1">Balls Bowled</p>
                      <p className="text-sm font-semibold text-gray-900">{member.tourDetails.performanceMetrics.ballsBowled}</p>
                    </div>
                  )}
                  {member.tourDetails.performanceMetrics.ballsBatted && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-1">Balls Batted</p>
                      <p className="text-sm font-semibold text-gray-900">{member.tourDetails.performanceMetrics.ballsBatted}</p>
                    </div>
                  )}
                  {member.tourDetails.performanceMetrics.accuracy && (
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <p className="text-xs font-medium text-gray-500 mb-1">Accuracy</p>
                      <p className="text-sm font-semibold text-gray-900">{member.tourDetails.performanceMetrics.accuracy}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="mx-auto">
      <ToastContainer toasts={toasts} onClose={removeToast} />
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-3 text-gray-600 hover:text-gray-900 transition-colors text-base"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Members
        </button>
      </div>

      {/* Main Content - Left Right Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side - User Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 sticky top-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center text-center mb-8">
              {(member as any).image ? (
                <div className="w-24 h-24 rounded-full mb-4 shadow-md overflow-hidden">
                  <img
                    src={(member as any).image}
                    alt={getMemberName()}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to initials if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const name = getMemberName();
                        parent.innerHTML = name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("");
                        parent.className = "w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4 shadow-md";
                        parent.style.background = "linear-gradient(135deg, #6b7280 0%, #4b5563 100%)";
                      }
                    }}
                  />
                </div>
              ) : (
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4 shadow-md"
                  style={{
                    background: `linear-gradient(135deg, #6b7280 0%, #4b5563 100%)`,
                  }}
                >
                  {getMemberName()
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
              )}
              <h1 className="text-xl font-semibold text-gray-900 mb-3">
                {getMemberName()}
              </h1>
              <div className="flex flex-col gap-3 w-full mb-6">
                <span className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg ${getMembershipColor(getMemberType())}`}>
                  {getMemberType()}
                </span>
                <span
                  className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg ${
                    getMemberStatus() === "Active"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {getMemberStatus()}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm text-gray-900">{getMemberEmail()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm text-gray-900">{getMemberPhone()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Center</p>
                  <p className="text-sm text-gray-900">{getMemberCenter()}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Member Since</p>
                  <p className="text-sm text-gray-900">{getMemberJoinDate()}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {/* <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-3 bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors text-[14px] font-medium">
                <Edit className="h-4 w-4" />
                Edit Member
              </button>
              <button className="flex items-center justify-center gap-3 bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors text-base font-medium">
                <Shield className="h-4 w-4" />
                Block Booking
              </button>
              <button className="flex items-center justify-center gap-3 bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors text-base font-medium">
                <Shield className="h-4 w-4" />
                Block Facility
              </button>
            </div> */}
          </div>
        </div>

        {/* Right Side - All Details */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            {/* Subscription Details */}
            {renderSubscriptionDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}
