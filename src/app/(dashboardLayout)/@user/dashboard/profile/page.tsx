import ProfileView from "@/components/modules/user/profile/ProfileView";

export default function ProfilePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Public Profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          This is how others will see your profile.
        </p>
      </div>

      <ProfileView />
    </div>
  );
}
