const LEGACY_DEFAULT_PROFILE_IMAGE =
  "https://jk-cabinetry.s3.us-east-1.amazonaws.com/common/user.jpg";

export const DEFAULT_PROFILE_IMAGE = "/images/default-avatar.svg";

const isMissingProfileImage = (profileImage?: string | null): boolean => {
  const trimmed = profileImage?.trim();
  if (!trimmed) return true;

  return (
    trimmed === LEGACY_DEFAULT_PROFILE_IMAGE ||
    trimmed.endsWith("/common/user.jpg")
  );
};

export const getProfileImageUrl = (profileImage?: string | null): string => {
  if (isMissingProfileImage(profileImage)) {
    return DEFAULT_PROFILE_IMAGE;
  }

  return profileImage!.trim();
};

export type DocumentPreviewType = "image" | "pdf";

export const getDocumentPreviewType = (url: string): DocumentPreviewType => {
  const extension = url.split("?")[0].split(".").pop()?.toLowerCase();
  if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension || "")) {
    return "image";
  }
  return "pdf";
};
