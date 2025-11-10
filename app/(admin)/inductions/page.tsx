"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";
import { Dropdown, Input, Pagination } from "../../components/ui";
import { getFaciltyCode } from "./services";
import { Member } from "../../lib/mockData";

export default function MembersPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [membershipFilter, setMembershipFilter] = useState("All");
  const [centerFilter, setCenterFilter] = useState("All");
  const [members, setMembers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFaciltyCode = async () => {
      setLoading(true);
      try {
        const response = await getFaciltyCode(itemsPerPage);
        if (response?.data) {
          setMembers(response.data?.documents || []);
          console.log(response.data?.pagination?.limit,"response.data?.pagination?.limit");
          // Set total items from API response (adjust based on your API structure)
          setTotalItems(response.data?.pagination?.limit );
        }
      } catch (error) {
        console.error("Error fetching facility code:", error);
        setMembers([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    };
    fetchFaciltyCode();
  }, [currentPage, itemsPerPage]);

  // Filter members: show all by default, filter by participants when searching
  const filteredMembers = useMemo(() => {
    if (!members.length) return [];

    // If no search query, show all members
    if (!searchQuery.trim()) {
      return members;
    }

    // When searching, filter by participants' name and email
    const searchLower = searchQuery.toLowerCase().trim();
    
    return members.filter((member) => {
      // Check if member has participants array
      if (!member.participants || !Array.isArray(member.participants)) {
        return false;
      }

      // Check if any participant matches the search query (name or email)
      const hasMatchingParticipant = member.participants.some((participant: any) => {
        const nameMatch = participant.name && 
          participant.name.toLowerCase().includes(searchLower);
        const emailMatch = participant.email && 
          participant.email.toLowerCase().includes(searchLower);
        
        return nameMatch || emailMatch;
      });

      return hasMatchingParticipant;
    });
  }, [members, searchQuery]);

  // Calculate total pages based on total items from API
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-10 bg-transparent rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Induction Bookings</h1>
            <p className="text-gray-600">Manage your organization induction bookings</p>
          </div>
          {/* <button
            className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2 transition-colors"
            aria-label="Add Member"
          >
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button> */}
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 items-center mt-4">
          {/* Search Bar */}
          <Input
            placeholder="Search members..."
            value={searchQuery}
            onChange={setSearchQuery}
            icon={<Search className="h-4 w-4" />}
            iconPosition="left"
            className="text-[15px]"
          />

          {/* Filters */}
          <div className="flex gap-2">
            {/* Status Filter Dropdown */}
            {/* <Dropdown
              placeholder="All Status"
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
              ]}
              value={statusFilter}
              onChange={setStatusFilter}
              allOptionLabel="All Status"
              classname="text-[15px]"
            /> */}

            {/* Membership Filter Dropdown */}
            {/* <Dropdown
              placeholder="All Types"
              options={[
                { value: "Premium", label: "Premium" },
                { value: "Standard", label: "Standard" },
                { value: "Night Owl", label: "Night Owl" },
                { value: "Family", label: "Family" },
                { value: "Tour Only", label: "Tour Only" },
                { value: "Prospect", label: "Prospect" },
                { value: "Induction", label: "Induction" },
              ]}
              value={membershipFilter}
              onChange={setMembershipFilter}
              allOptionLabel="All Types"
            /> */}

            {/* Center Filter Dropdown */}
            {/* <Dropdown
              placeholder="All Centers"
              options={[
                { value: "Bangalore", label: "Bangalore" },
                { value: "Houston, USA", label: "Houston, USA" },
                { value: "Melbourne, AUS", label: "Melbourne, AUS" },
                { value: "Brisbane, AUS", label: "Brisbane, AUS" },
              ]}
              value={centerFilter}
              onChange={setCenterFilter}
              allOptionLabel="All Centers"
            /> */}
          </div>
        </div>
      </div>

      {/* Scrollable Members Card Grid */}
      <div className="max-h-[calc(100vh-280px)] overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-600">Loading inductions...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredMembers.map((member) => {
          // Get primary participant or first participant
          const primaryParticipant = member.participants?.find((p: any) => p.type === "primary") || member.participants?.[0];
          const participantName = primaryParticipant?.name || "N/A"; 


          
          // Get initials from name
          const getInitials = (name: string) => {
            if (!name || typeof name !== 'string') return "N/A";
            return name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2);
          };

          return (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg group min-h-0 cursor-pointer"
              onClick={() => router.push(`/inductions/${member.participants[0]?.email}`)}
            >
              {/* Profile Picture - Image or Initials */}
              {member.image ? (
                <img
                  src={member.image}
                  alt={`Profile picture of ${participantName}`}
                  className="w-14 h-14 rounded-full mb-3 object-cover border-2 border-gray-200"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling?.classList.remove("hidden");
                  }}
                />
              ) : null}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 text-white text-xl font-bold ${
                  member.image ? "hidden" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, #3b82f6 60%, #6366f1 100%)`,
                }}
                aria-label={`Avatar for ${participantName}`}
              >
                {getInitials(participantName)}
              </div>
              <div className="text-base font-semibold text-gray-900 mb-2">
                {participantName}
              </div>
              <span
                className={`inline-flex px-3 py-1 text-xs font-semibold rounded-lg mb-2 ${
                  member.status === "confirmed" || member.status === "Confirmed"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : member.status === "pending" || member.status === "Pending"
                    ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    : "bg-gray-50 text-gray-700 border border-gray-200"
                }`}
              >
                {member.status || "N/A"}
              </span>
              {/* Time Slot Display */}
              {member.inductionType && member.timeSlot && (
                <div className="text-xs text-gray-600 mb-2">
                  {new Date(member.timeSlot.startTime).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })} • {new Date(member.timeSlot.startTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })} - {new Date(member.timeSlot.endTime).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              )}
              {/* <div className="text-xs text-gray-500 mb-1">
                Status:{" "}
                <span className="font-medium text-gray-700">
                  {member.status || "N/A"}
                </span>
              </div> */}
              {/* <span
                className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full mb-1 ${
                  member.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : member.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {member.status || "N/A"}
              </span>
              <div className="flex flex-col gap-0.5 mb-2 mt-0.5 w-full">
                <div
                  className="text-xs text-gray-500 truncate"
                  title={participantEmail}
                >
                  <span className="font-medium text-gray-700">Email:</span>{" "}
                  {participantEmail}
                </div> */}
                {/* {member.facilityCode && (
                  <div
                    className="text-xs text-gray-500 truncate"
                    title={member.facilityCode}
                  >
                    <span className="font-medium text-gray-700">Facility:</span>{" "}
                    {member.facilityCode}
                  </div>
                )}
                {member.slotCode && (
                  <div
                    className="text-xs text-gray-500 truncate"
                    title={member.slotCode}
                  >
                    <span className="font-medium text-gray-700">Slot:</span>{" "}
                    {member.slotCode}
                  </div>
                )}
                {member.timeSlot && (
                  <div
                    className="text-xs text-gray-500 truncate"
                    title={`${member.timeSlot.startTime} - ${member.timeSlot.endTime}`}
                  >
                    <span className="font-medium text-blue-700">Time:</span>{" "}
                    <span className="text-blue-600">
                      {new Date(member.timeSlot.startTime).toLocaleString()}
                    </span>
                  </div>
                )}
              </div> */}
              <div className="flex space-x-2 mt-auto">
                <button
                  className="text-blue-600 hover:text-blue-900 p-2 rounded-full transition-colors"
                  aria-label="View Member"
                  title="View"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/inductions/${member.participants[0]?.email}`);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </button>
                {/* <button
                  className="text-green-600 hover:text-green-900 p-2 rounded-full transition-colors"
                  aria-label="Edit Member"
                  title="Edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle edit functionality
                  }}
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  className="text-red-600 hover:text-red-900 p-2 rounded-full transition-colors"
                  aria-label="Delete Member"
                  title="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete functionality
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </button> */}
              </div>
            </div>
          );
        })}
          </div>

            {/* Pagination */}
            {totalItems > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
