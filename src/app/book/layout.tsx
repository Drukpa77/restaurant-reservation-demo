import { HoldWatcher } from "@/components/booking/HoldWatcher";

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <HoldWatcher />
      {children}
    </div>
  );
}
