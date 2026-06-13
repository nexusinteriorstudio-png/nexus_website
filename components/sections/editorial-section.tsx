"use client";

const stats = [
  { label: "Projects Completed", value: "60+" },
  { label: "Years of Experience", value: "2" },
  { label: "Cities Worldwide", value: "5" },
];

export function EditorialSection() {
  return (
    <section className="bg-background">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="font-medium text-foreground text-5xl">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
