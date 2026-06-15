"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { useRegisterMutation } from "@/store/api/authApi";
import { IError } from "@/types/error.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import AdminApprovalModal from "../layouts/Common/AdminApprovalModal";

interface RegisterFormProps {
  title?: string;
  description?: string;
}

const RegisterForm = ({ title, description }: RegisterFormProps) => {
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [register, { isLoading }] = useRegisterMutation();

  const form = useForm<RegisterFormData, undefined, RegisterFormData>({
    resolver: zodResolver(
      registerSchema,
    ) as unknown as Resolver<RegisterFormData>,
    defaultValues: {
      companyName: "",
      companyWebsite: "",
      phoneNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      addressLine2: "",
      state: "",
      country: "",
      city: "",
      zipCode: "",
      businessDocument: undefined,
      salesTaxExemption: undefined,
      businessType: "",
      perMonthSpend: undefined,
      // closestLocation: "",
      howHearAboutUs: "",
      agreeTerms: false,
    },
  });

  const appendIfPresent = (
    formData: FormData,
    key: string,
    value?: string | number | File | null,
  ) => {
    if (value === undefined || value === null) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (typeof value === "number") {
      formData.append(key, String(value));
      return;
    }

    const trimmedValue = value.trim();
    if (!trimmedValue) return;
    formData.append(key, trimmedValue);
  };

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      let website = data.companyWebsite?.trim() || "";

      if (website && !/^https?:\/\//i.test(website)) {
        if (/^www\./i.test(website) || website.includes(".")) {
          website = `https://${website}`;
        } else {
          website = `https://www.${website}`;
        }
      }

      appendIfPresent(formData, "companyName", data.companyName);
      appendIfPresent(formData, "companyWebsite", website);
      appendIfPresent(formData, "phoneNumber", data.phoneNumber);
      appendIfPresent(formData, "firstName", data.firstName);
      appendIfPresent(formData, "lastName", data.lastName);
      appendIfPresent(formData, "address", data.address);
      appendIfPresent(formData, "addressLine2", data.addressLine2);
      appendIfPresent(formData, "state", data.state);
      appendIfPresent(formData, "country", data.country);
      appendIfPresent(formData, "city", data.city);
      appendIfPresent(formData, "zipCode", data.zipCode);
      appendIfPresent(formData, "email", data.email);
      appendIfPresent(formData, "password", data.password);
      appendIfPresent(formData, "businessType", data.businessType);
      appendIfPresent(formData, "perMonthSpend", data.perMonthSpend);
      appendIfPresent(formData, "howHearAboutUs", data.howHearAboutUs);
      appendIfPresent(formData, "businessDocument", data.businessDocument);
      appendIfPresent(formData, "salesTaxExemption", data.salesTaxExemption);
      await register(formData).unwrap();
      setShowApprovalModal(true);
    } catch (error) {
      const err = error as IError;
      toast.error(
        err.data?.message || "Registration failed. Please try again.",
      );
    }
  };

  return (
    <section className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {(title || description) && (
            <div className="mb-6 text-center">
              {title && (
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {title}
                </h2>
              )}
              {description && <p className="text-gray-600">{description}</p>}
            </div>
          )}

          {/* First Name & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type first name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type last name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Company Name, Company Website, Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ">
                    Official Company Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyWebsite"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold ">
                    Company Website
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Type email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Type phone number"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    New Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Re-type password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type address"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Address Line 2
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type address 2"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Address Line 2 & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Country</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type country"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">State</FormLabel>
                  <Input
                    placeholder="Type state"
                    {...field}
                    disabled={isLoading}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* City & Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">City</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type city name"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zipCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Zip Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Type zip code"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="businessDocument"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Business Document
                  </FormLabel>
                  <FormControl>
                    <label className="flex items-center justify-center gap-2 w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors h-10">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm truncate">
                        {value?.name || "Business Document"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        disabled={isLoading}
                        {...field}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salesTaxExemption"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="font-semibold">
                    Sales Tax Exemption
                  </FormLabel>
                  <FormControl>
                    <label className="flex items-center justify-center gap-2 w-full px-3 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors h-10">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm truncate">
                        {value?.name || "Sales Tax Exemption"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onChange(file);
                        }}
                        disabled={isLoading}
                        {...field}
                      />
                    </label>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Business Type */}
          <FormField
            control={form.control}
            name="businessType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  What type of business do you run?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      { id: "contractor", name: "Contractor" },
                      { id: "dealer", name: "Dealer" },
                      {
                        id: "salesRepresentative",
                        name: "Sales Representative",
                      },
                      { id: "showroom", name: "Showroom" },
                      { id: "builderDeveloper", name: "Builder / Developer" },
                      { id: "distributor", name: "Distributor" },
                      { id: "retailer", name: "Retailer (w/ a Showroom)" },
                      { id: "onlineRetailer", name: "Online Retailer" },
                      { id: "other", name: "Other" },
                    ]?.map((business) => (
                      <SelectItem key={business.id} value={business.id}>
                        {business.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* How much do you spend on cabinetry per month */}
          <FormField
            control={form.control}
            name="perMonthSpend"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  How much do you spend on cabinetry PER MONTH?
                </FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  defaultValue={field.value?.toString()}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      { id: "0", name: "Less than $500" },
                      { id: "500", name: "$500 - $1,000" },
                      { id: "1000", name: "$1,000 - $2,500" },
                      { id: "2500", name: "$2,500 - $5,000" },
                      { id: "5000", name: "$5,000 - $10,000" },
                      { id: "10000", name: "$10,000 - $25,000" },
                      { id: "25000", name: "$25,000 - $50,000" },
                      { id: "50000", name: "$50,000 or more" },
                    ].map((budget) => (
                      <SelectItem key={budget.id} value={budget.id}>
                        {budget.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="closestLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="after:content-['*'] after:text-red-600 font-semibold">
                  Closest J&K Location
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      { id: "connecticut", name: "Connecticut" },
                      { id: "maine", name: "Maine" },
                      { id: "massachusetts", name: "Massachusetts" },
                      { id: "new_hampshire", name: "New Hampshire" },
                      { id: "new_york", name: "New York" },
                      { id: "rhode_island", name: "Rhode Island" },
                      { id: "vermont", name: "Vermont" },
                    ].map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="howHearAboutUs"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  How Did You Hear About Us?
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      { id: "google", name: "Google / Search Engine" },
                      { id: "social", name: "Social Media" },
                      { id: "advertisement", name: "Advertisement" },
                      { id: "referral", name: "Referral" },
                      { id: "word_of_mouth", name: "Word of Mouth" },
                      { id: "other", name: "Other" },
                    ].map((source) => (
                      <SelectItem key={source.id} value={source.id}>
                        {source.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms Agreement */}
          <FormField
            control={form.control}
            name="agreeTerms"
            render={({ field }) => (
              <FormItem className="flex items-center  space-x-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <label className="cursor-pointer text-sm">
                    I agree that my following information above is correct and I
                    am not falsifying my identity or business information. I
                    agree to the Terms & Conditions along with the Privacy
                    Policy.
                  </label>

                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 cursor-pointer bg-[#721011] hover:bg-[#5a0d0e] rounded-md"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-[#721011] hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </Form>
      <AdminApprovalModal
        open={showApprovalModal}
        setShowApprovalModal={setShowApprovalModal}
      />
    </section>
  );
};

export default RegisterForm;
