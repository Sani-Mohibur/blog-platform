import SettingsForm from "@/components/modules/user/settings/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Account Settings
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Update your profile information and configure global preferences.
        </p>
      </div>

      <div className="border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl p-6 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md shadow-xl">
        <SettingsForm />
      </div>
    </div>
  );
}
