import { baseApi } from "./baseApi";

export type IContactMessageInput = {
  fullName: string;
  email: string;
  phoneNumber: string;
  customerType: string;
  howHearAboutUs: string;
  message: string;
  nearestLocation: string;
};

export type ContactResponse = {
  success: boolean;
  message: string;
};

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendContactMessage: builder.mutation<ContactResponse, IContactMessageInput>(
      {
        query: (contactData) => ({
          url: "/contact",
          method: "POST",
          body: contactData,
        }),
      }
    ),
  }),
  overrideExisting: false,
});

export const { useSendContactMessageMutation } = contactApi;
