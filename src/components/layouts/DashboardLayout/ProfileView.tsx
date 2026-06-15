"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useAuth from "@/hooks/useAuth";
import { Building, Edit, ExternalLink, Mail, MapPin, Phone, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  getDocumentPreviewType,
  getProfileImageUrl,
} from "@/utils/profile.utils";

const ProfileView = () => {
  const { user, isLoading } = useAuth();
  const [licensePreview, setLicensePreview] = useState<{
    src: string;
    type: "image" | "pdf";
    title: string;
  } | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const openLicensePreview = (licenseUrl: string, title: string) => {
    setLicensePreview({
      src: licenseUrl,
      type: getDocumentPreviewType(licenseUrl),
      title,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Profile
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View and manage your account information
          </p>
        </div>
        <Link href="/dashboard/profile/edit">
          <Button className="bg-primary hover:bg-primary-hover rounded-md text-primary-foreground w-full sm:w-auto cursor-pointer">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile Card */}
      <Card className="border-border shadow-none">
        <CardHeader className="bg-secondary/20 rounded-t-2xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-16 w-16 sm:h-20 sm:w-20 border-4 border-primary">
              <AvatarImage
                src={getProfileImageUrl(user?.profileImage)}
                alt={`${user?.firstName} ${user?.lastName}`}
              />
              <AvatarFallback className="bg-primary text-primary-foreground text-xl sm:text-2xl font-bold">
                {user?.firstName?.charAt(0) || ""}
                {user?.lastName?.charAt(0) || ""}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl text-foreground">
                {user?.firstName} {user?.lastName}
              </CardTitle>
              <p className="text-sm sm:text-base text-muted-foreground">
                {user?.companyName}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Email
                    </p>
                    <p className="font-medium text-sm sm:text-base text-foreground break-all">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Phone
                    </p>
                    <p className="font-medium text-sm sm:text-base text-foreground">
                      {user?.phoneNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Address Line 1
                    </p>
                    <p className="font-medium text-sm sm:text-base text-foreground">
                      {user?.address}
                    </p>
                  </div>
                </div>
                {user?.addressLine2 && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Address Line 2
                      </p>
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        {user?.addressLine2}
                      </p>
                    </div>
                  </div>
                )}
                {user?.city && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        City
                      </p>
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        {user?.city}
                      </p>
                    </div>
                  </div>
                )}
                {user?.state && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        State
                      </p>
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        {user?.state}
                      </p>
                    </div>
                  </div>
                )}
                {user?.zipCode && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        ZIP Code
                      </p>
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        {user?.zipCode}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Business Information */}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-semibold text-foreground border-b border-border pb-2">
                Business Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Business Type
                    </p>
                    <p className="font-medium text-sm sm:text-base text-foreground">
                      {user?.businessType}
                    </p>
                  </div>
                </div>

                {user?.companyName && (
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        Company
                      </p>
                      <p className="font-medium text-sm sm:text-base text-foreground">
                        {user?.companyName}
                      </p>
                    </div>
                  </div>
                )}

                {user?.businessDocument && (
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="w-full min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        Business Document
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openLicensePreview(
                              user.businessDocument || "",
                              "Business Document"
                            )
                          }
                          className="group relative overflow-hidden cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                          View Document
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="cursor-pointer"
                        >
                          <a
                            href={user.businessDocument}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in Tab
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {user?.salesTaxExemption && (
                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div className="w-full min-w-0 flex-1">
                      <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                        Sales Tax Exemption
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            openLicensePreview(
                              user.salesTaxExemption || "",
                              "Sales Tax Exemption"
                            )
                          }
                          className="group relative overflow-hidden cursor-pointer"
                        >
                          <Eye className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                          View Document
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="cursor-pointer"
                        >
                          <a
                            href={user.salesTaxExemption}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in Tab
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simple License Preview Dialog */}
      <Dialog
        open={!!licensePreview}
        onOpenChange={() => setLicensePreview(null)}
      >
        <DialogContent className="max-w-[95vw] sm:max-w-3xl max-h-[90vh] p-4">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl font-semibold pr-8">
              {licensePreview?.title}
            </DialogTitle>
          </DialogHeader>

          <div className="max-h-[calc(90vh-120px)] overflow-auto bg-secondary/5 rounded-lg p-2 sm:p-4">
            {licensePreview?.src &&
              (licensePreview.type === "image" ? (
                <div className="flex items-center justify-center min-h-[50vh]">
                  <Image
                    src={licensePreview.src}
                    alt={licensePreview.title}
                    width={600}
                    height={800}
                    className="max-w-full h-auto object-contain shadow-xl rounded-lg"
                  />
                </div>
              ) : (
                <iframe
                  src={licensePreview.src}
                  className="w-full border-0 rounded-lg"
                  title={licensePreview.title}
                  style={{ minHeight: "60vh" }}
                />
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileView;
