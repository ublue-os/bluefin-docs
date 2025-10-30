import React from "react";
import Heading from "@theme/Heading";
import { useStreamVersions, PackageInfo } from "../hooks/useStreamVersions";

interface PackageSummaryProps {
  stream: "lts" | "gts" | "stable";
  title: string;
}

export default function PackageSummary({ stream, title }: PackageSummaryProps) {
  const streamVersions = useStreamVersions();

  // Get packages for the specified stream
  const packages: PackageInfo[] =
    stream === "lts"
      ? streamVersions.ltsPackages
      : stream === "gts"
        ? streamVersions.gtsPackages
        : streamVersions.stablePackages;

  if (packages.length === 0) {
    return null;
  }

  return (
    <div
      className="margin-bottom--lg"
      style={{
        backgroundColor: "var(--ifm-background-color)",
        borderRadius: "8px",
        border: "1px solid var(--ifm-color-emphasis-300)",
        padding: "1.5rem",
      }}
    >
      <Heading
        as="h3"
        style={{
          marginTop: 0,
          marginBottom: "1rem",
          color: "var(--ifm-color-emphasis-800)",
          fontSize: "1.25rem",
          fontWeight: 600,
          borderBottom: "2px solid var(--ifm-color-primary)",
          paddingBottom: "0.5rem",
        }}
      >
        {title}
      </Heading>
      <div
        style={{
          fontSize: "0.95rem",
          fontFamily: "monospace",
          lineHeight: "1.6",
        }}
      >
        {packages.map((pkg) => (
          <div key={pkg.name}>
            <strong>{pkg.name}:</strong> {pkg.version}
          </div>
        ))}
      </div>
    </div>
  );
}
