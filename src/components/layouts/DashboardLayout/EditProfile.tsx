"use client";
import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  Camera,
  Upload,
  File,
  Eye,
  User,
  Mail,
  Phone,
  Building2,
  Globe,
  MapPin,
  Home,
  FileText,
  Briefcase,
  DollarSign,
  MapPinned,
  Radio,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUpdateProfileMutation } from "@/store/api/profileApi";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { toast } from "@/hooks";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { getProfileImageUrl } from "@/utils/profile.utils";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  companyWebsite: string;
  address: string;
  addressLine2: string;
  country: string;
  city: string;
  state: string;
  zipCode: string;
  businessType: string;
  perMonthSpend: number | undefined;
  closestLocation: string;
  howHearAboutUs: string;
}

const EditProfile = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phoneNumber || "",
    companyName: user?.companyName || "",
    companyWebsite: user?.companyWebsite || "",
    address: user?.address || "",
    addressLine2: user?.addressLine2 || "",
    country: user?.country || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    businessType: user?.businessType || "",
    perMonthSpend: user?.perMonthSpend,
    closestLocation: user?.closestLocation || "",
    howHearAboutUs: user?.howHearAboutUs || "",
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(
    null
  );
  const [drivingLicenseFile, setDrivingLicenseFile] = useState<File | null>(
    null
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [previewBusinessLicense, setPreviewBusinessLicense] = useState<
    string | null
  >(user?.businessDocument ? `${user?.businessDocument}` : null);
  const [previewDrivingLicense, setPreviewDrivingLicense] = useState<
    string | null
  >(user?.salesTaxExemption ? `${user?.salesTaxExemption}` : null);
  const [licensePreview, setLicensePreview] = useState<{
    src: string;
    type: "image" | "pdf";
    title: string;
  } | null>(null);

  React.useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        email: user?.email || "",
        phone: user?.phoneNumber || "",
        companyName: user?.companyName || "",
        companyWebsite: user?.companyWebsite || "",
        address: user?.address || "",
        addressLine2: user?.addressLine2 || "",
        country: user?.country || "",
        city: user?.city || "",
        state: user?.state || "",
        zipCode: user?.zipCode || "",
        businessType: user?.businessType || "",
        perMonthSpend: user?.perMonthSpend,
        closestLocation: user?.closestLocation || "",
        howHearAboutUs: user?.howHearAboutUs || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "perMonthSpend" ? Number(value) : value,
    }));
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file for profile picture");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        toast.error("Profile image size exceeds 2MB limit");
        return;
      }

      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBusinessLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/(image\/.*|application\/pdf)/)) {
        toast.error(
          "Please select a valid file (PDF, JPG, PNG, etc.) for business license"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Business license file size exceeds 5MB limit");
        return;
      }

      setBusinessLicenseFile(file);
      setPreviewBusinessLicense(URL.createObjectURL(file));
    }
  };

  const handleDrivingLicenseChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.match(/(image\/.*|application\/pdf)/)) {
        toast.error(
          "Please select a valid file (PDF, JPG, PNG, etc.) for driving license"
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("Driving license file size exceeds 5MB limit");
        return;
      }

      setDrivingLicenseFile(file);
      setPreviewDrivingLicense(URL.createObjectURL(file));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleBusinessLicenseClick = () => {
    const element = document.getElementById(
      "businessLicenseInput"
    ) as HTMLInputElement;
    element?.click();
  };

  const handleDrivingLicenseClick = () => {
    const element = document.getElementById(
      "drivingLicenseInput"
    ) as HTMLInputElement;
    element?.click();
  };

  const openLicensePreview = (src: string, title: string) => {
    const fileExtension = src.split(".").pop()?.toLowerCase();
    const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
      fileExtension || ""
    );
    setLicensePreview({
      src,
      type: isImage ? "image" : "pdf",
      title,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();

      (Object.keys(formData) as Array<keyof FormData>).forEach((key) => {
        const value = formData[key];
        if (value !== undefined && value !== null && value !== "") {
          formDataObj.append(key, value.toString());
        }
      });

      if (profileImageFile) {
        formDataObj.append("profileImage", profileImageFile);
      }
      if (businessLicenseFile) {
        formDataObj.append("businessDocument", businessLicenseFile);
      }
      if (drivingLicenseFile) {
        formDataObj.append("salesTaxExemption", drivingLicenseFile);
      }

      await updateProfile(formDataObj).unwrap();
      toast.success("Profile updated successfully!");
      router.push("/dashboard/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex items-center gap-3 sm:gap-4">
        <Link href="/dashboard/profile">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 sm:h-10 shadow-none sm:w-10 rounded-md"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Edit Profile
          </h1>
          <p className="text-sm text-muted-foreground">
            Update your account information
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 sm:space-y-6">
          {/* Profile Image Upload */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                Profile Picture
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="flex flex-col items-center gap-4 sm:gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary">
                    <AvatarImage
                      src={
                        profileImage || getProfileImageUrl(user?.profileImage)
                      }
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-2xl sm:text-3xl">
                      {formData.firstName?.charAt(0) || ""}
                      {formData.lastName?.charAt(0) || ""}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={handleImageClick}
                    className="absolute bottom-0 right-0 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full p-2 shadow-lg transition-all hover:scale-110 cursor-pointer"
                  >
                    <Camera className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageChange}
                  className="hidden"
                />
                <div className="text-center w-full">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleImageClick}
                    className="gap-2 w-full sm:w-auto rounded shadow-none cursor-pointer"
                  >
                    <Upload className="h-4 w-4" />
                    {user?.profileImage ? "Change Photo" : "Upload Photo"}
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-gray-500" />
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-gray-500" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border-gray-300 bg-gray-50"
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-gray-500" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="companyName"
                    className="text-sm flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-gray-500" />
                    Official Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="companyWebsite"
                    className="text-sm flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-gray-500" />
                    Company Website
                  </Label>
                  <Input
                    id="companyWebsite"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://www.example.com"
                    className="border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Details */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Business Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="businessType"
                    className="text-sm flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-gray-500" />
                    What type of business do you run?
                  </Label>
                  <Select
                    value={formData.businessType}
                    defaultValue={formData.businessType}
                    onValueChange={(value) =>
                      handleSelectChange("businessType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="showroom">Showroom</SelectItem>
                      <SelectItem value="builderDeveloper">
                        Builder / Developer
                      </SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="retailer">
                        Retailer (w/ a Showroom)
                      </SelectItem>
                      <SelectItem value="onlineRetailer">
                        Online Retailer
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="perMonthSpend"
                    className="text-sm flex items-center gap-2"
                  >
                    <DollarSign className="w-4 h-4 text-gray-500" />
                    How much do you spend on cabinetry PER MONTH?
                  </Label>
                  <Select
                    value={formData.perMonthSpend?.toString()}
                    defaultValue={formData.perMonthSpend?.toString()}
                    onValueChange={(value) =>
                      handleSelectChange("perMonthSpend", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Less than $500</SelectItem>
                      <SelectItem value="500">$500 - $1,000</SelectItem>
                      <SelectItem value="1000">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500">$2,500 - $5,000</SelectItem>
                      <SelectItem value="5000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10000">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25000">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50000">$50,000 or more</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="closestLocation"
                    className="text-sm flex items-center gap-2"
                  >
                    <MapPinned className="w-4 h-4 text-gray-500" />
                    Closest J&K Location
                  </Label>
                  <Select
                    value={formData.closestLocation}
                    defaultValue={formData.closestLocation}
                    onValueChange={(value) =>
                      handleSelectChange("closestLocation", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="connecticut">Connecticut</SelectItem>
                      <SelectItem value="maine">Maine</SelectItem>
                      <SelectItem value="massachusetts">
                        Massachusetts
                      </SelectItem>
                      <SelectItem value="new_hampshire">
                        New Hampshire
                      </SelectItem>
                      <SelectItem value="new_york">New York</SelectItem>
                      <SelectItem value="rhode_island">Rhode Island</SelectItem>
                      <SelectItem value="vermont">Vermont</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="howHearAboutUs"
                    className="text-sm flex items-center gap-2"
                  >
                    <Radio className="w-4 h-4 text-gray-500" />
                    How Did You Hear About Us?
                  </Label>
                  <Select
                    value={formData.howHearAboutUs}
                    onValueChange={(value) =>
                      handleSelectChange("howHearAboutUs", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select One" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">
                        Google / Search Engine
                      </SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="advertisement">
                        Advertisement
                      </SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="word_of_mouth">
                        Word of Mouth
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Documents */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Business Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="businessLicense"
                    className="text-sm flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    Business Document
                  </Label>
                  <div className="flex flex-col gap-2">
                    {previewBusinessLicense && (
                      <div className="flex items-center justify-between gap-2 p-3 border border-gray-200 rounded-lg bg-secondary/10">
                        <div
                          onClick={() =>
                            openLicensePreview(
                              previewBusinessLicense,
                              "Business Document"
                            )
                          }
                          className="flex items-center gap-2 min-w-0 flex-1 cursor-pointer"
                        >
                          <File className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm truncate">
                            {businessLicenseFile
                              ? businessLicenseFile.name
                              : "Current File"}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="shrink-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <input
                      id="businessLicenseInput"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleBusinessLicenseChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBusinessLicenseClick}
                      className="gap-2 w-full cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      {previewBusinessLicense
                        ? "Change Document"
                        : "Upload Document"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG. Max size 5MB
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="driveingLicense"
                    className="text-sm flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    Sales Tax Exemption
                  </Label>
                  <div className="flex flex-col gap-2">
                    {previewDrivingLicense && (
                      <div
                        onClick={() =>
                          openLicensePreview(
                            previewDrivingLicense,
                            "Sales Tax Exemption"
                          )
                        }
                        className="flex items-center cursor-pointer justify-between gap-2 p-3 border border-gray-200 rounded-lg bg-secondary/10"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <File className="h-5 w-5 text-primary shrink-0" />
                          <span className="text-sm truncate">
                            {drivingLicenseFile
                              ? drivingLicenseFile.name
                              : "Current File"}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="shrink-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <input
                      id="drivingLicenseInput"
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={handleDrivingLicenseChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleDrivingLicenseClick}
                      className="gap-2 w-full cursor-pointer"
                    >
                      <Upload className="h-4 w-4" />
                      {previewDrivingLicense
                        ? "Change Document"
                        : "Upload Document"}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PDF, JPG, PNG. Max size 5MB
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="border-border bg-background shadow-none">
            <CardHeader className="bg-secondary/20 rounded-t-xl p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg text-foreground flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Address Information
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="text-sm flex items-center gap-2"
                  >
                    <Home className="w-4 h-4 text-gray-500" />
                    Address Line 1
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="addressLine2"
                    className="text-sm flex items-center gap-2"
                  >
                    <Home className="w-4 h-4 text-gray-500" />
                    Address Line 2
                  </Label>
                  <Input
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    className="border-gray-300"
                    placeholder="Optional"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="country"
                      className="text-sm flex items-center gap-2"
                    >
                      <Globe className="w-4 h-4 text-gray-500" />
                      Country
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border-gray-300"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="zipCode"
                    className="text-sm flex items-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-gray-500" />
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="border-gray-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pb-4">
            <Button
              type="submit"
              className="bg-primary h-10 rounded-md hover:bg-primary-hover w-full sm:w-auto cursor-pointer"
              disabled={isUpdating}
            >
              {isUpdating ? (
                <>
                  <LoadingSpinner />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Link href="/dashboard/profile" className="w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                disabled={isUpdating}
                className="w-full h-10 rounded-md shadow-none cursor-pointer"
              >
                Cancel
              </Button>
            </Link>
          </div>
        </div>
      </form>

      {/* License Preview Modal */}
      <Dialog
        open={!!licensePreview}
        onOpenChange={() => setLicensePreview(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[80vh] p-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold pr-8">
              {licensePreview?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="max-h-[calc(90vh-120px)] sm:max-h-[calc(90vh-100px)] overflow-auto bg-secondary/5 rounded-lg p-2 sm:p-4">
            {licensePreview?.type === "image" ? (
              <div className="flex items-center justify-center min-h-[50vh] sm:min-h-full">
                <Image
                  src={licensePreview?.src}
                  alt={licensePreview?.title}
                  width={600}
                  height={800}
                  className="max-w-full h-auto object-contain shadow-xl rounded-lg"
                />
              </div>
            ) : (
              <iframe
                src={licensePreview?.src}
                className="w-full h-full border-0 rounded-lg"
                title={licensePreview?.title}
                style={{ minHeight: "60vh" }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
