import { Users, GraduationCap, BookOpen, Building2 } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Students",
      value: "100",
      icon: Users,
    },
    {
      title: "Faculty",
      value: "18",
      icon: GraduationCap,
    },
    {
      title: "Courses",
      value: "18",
      icon: BookOpen,
    },
    {
      title: "Departments",
      value: "6",
      icon: Building2,
    },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-5 mt-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl"
          >
            <Icon className="text-blue-400 mb-4" size={30} />

            <h3 className="text-zinc-400">{item.title}</h3>

            <p className="text-4xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        );
      })}
    </div>
  );
}