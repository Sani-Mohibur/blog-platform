import { adminService } from "@/services/admin.service";

import { userService } from "@/services/user.service";
import { SettingsForm } from "./settings-form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const { data: session } = await userService.getSession();
  if (!session || !session.user) redirect("/login");

  const { data, error } = await adminService.getSettings();

  if (error) {
    return (
      <div className="p-8 text-center text-zinc-500">
        Failed to load settings.
      </div>
    );
  }

  // If no settings exist yet, pass empty values
  const defaultSettings = {
    siteName: "",
    siteDescription: "",
    logoUrl: "",
    facebookUrl: "",
    twitterUrl: "",
    instagramUrl: "",
    contactEmail: "",
  };

  const settings = data || defaultSettings;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Site Settings</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Configure global platform variables and metadata.
        </p>
      </div>

      <SettingsForm 
        initialData={settings} 
        currentRole={session.user.role as string}
      />
    </div>
  );
}
