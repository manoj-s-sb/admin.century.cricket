import axios, { AxiosInstance } from "axios";

// API Base URLs - can be configured for different environments
const API_BASE_URLS = {
  facility:
    "https://facility-admin-fn-dwc8fcbyfub3aza3.centralus-01.azurewebsites.net",
  century:
    "https://booking-func-g5hzf9b9gqh9cdca.centralus-01.azurewebsites.net/",

};

export const getFaciltyCode = async (limit: number) => {
  const response = await axios.post(`${API_BASE_URLS.facility}/query/txn`, {
    type: "inductionbooking",
    limit: limit,
     
  });

  return response.data;
};

export const getMemberDetails = async (userId: any) => {
  const response = await axios.post(`${API_BASE_URLS.facility}/query/txn`, {
    type: "user",
    userId: userId,
  });
  return response.data;
};

export const getInductionList = async ({ userId }: { userId: string }) => {
  const response = await axios.post(
    `${API_BASE_URLS.century}induction/search`,
    {
      userId: userId,
    }
  );
  return response.data;
};

export const updateInductionSteps = async ({
  userId,
  subSteps,
}: {
  userId: string;
  inductionId: string;
  subSteps: Array<{ id: string; status: "completed" | "pending" }>;
}) => {
  const response = await axios.post(
    `${API_BASE_URLS.century}induction/status/update`,
    {
      userId: userId,
      subSteps: subSteps,
    }
  );
  return response.data;
};
