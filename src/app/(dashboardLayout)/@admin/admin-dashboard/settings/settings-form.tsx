"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { updateSettings } from "@/actions/admin.action";
import { Roles } from "@/constants/roles";
import { Save } from "lucide-react";

export function SettingsForm({ initialData, currentRole }: { initialData: any, currentRole: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    siteName: initialData.siteName || "",
    siteDescription: initialData.siteDescription || "",
    logoUrl: initialData.logoUrl || "",
    facebookUrl: initialData.facebookUrl || "",
    twitterUrl: initialData.twitterUrl || "",
    instagramUrl: initialData.instagramUrl || "",
    contactEmail: initialData.contactEmail || "",
  });

  const isModerator = currentRole === Roles.moderator;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isModerator) {
      toast.error("You don't have permission to perform this action.");
      return;
    }

    setLoading(true);
    try {
      const res = await updateSettings(formData);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Settings updated successfully");
      }
    } catch (err) {
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-2xl shadow-sm border border-zinc-200/60 max-w-3xl">
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="siteName">Site Name</Label>
            <Input
              id="siteName"
              name="siteName"
              value={formData.siteName}
              onChange={handleChange}
              disabled={isModerator}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="siteDescription">Site Description</Label>
          <Textarea
            id="siteDescription"
            name="siteDescription"
            value={formData.siteDescription}
            onChange={handleChange}
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logoUrl">Logo URL</Label>
          <Input
            id="logoUrl"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-4 pt-4 border-t border-zinc-100">
          <h3 className="text-sm font-medium text-zinc-900">Social Links</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="facebookUrl">Facebook URL</Label>
              <Input
                id="facebookUrl"
                name="facebookUrl"
                value={formData.facebookUrl}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input
                id="twitterUrl"
                name="twitterUrl"
                value={formData.twitterUrl}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagramUrl">Instagram URL</Label>
              <Input
                id="instagramUrl"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={loading}
        >
          <Save className="h-4 w-4 mr-2" />
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
