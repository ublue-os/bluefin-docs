import React, { useState } from "react";
import Layout from "@theme/Layout";
import { useStreamVersions } from "../hooks/useStreamVersions";
import styles from "./chooser.module.css";

interface ImageState {
  arch: string | undefined;
  base: string;
  gpu: string | undefined;
  stream: string | undefined;
  kernel: string | undefined;
  imagesrc: string | undefined;
}

// Release definitions with their characteristics
const releases = [
  {
    id: "lts",
    title: "Bluefin LTS",
    subtitle: "For professionals and AI/ML engineers",
    description:
      "A long term support experience on an enterprise-grade foundation.",
    image: "/img/characters/achillobator.webp",
    supportedArch: ["x86", "arm"],
    recommended: false,
  },
  {
    id: "gts",
    title: "Bluefin GTS",
    subtitle: "For Everyone",
    description:
      "A modern desktop with a relaxed update cadence. Pick this if you're not sure.",
    image: "/img/characters/intrigued.webp",
    supportedArch: ["x86"],
    recommended: true,
  },
  {
    id: "stable",
    title: "Bluefin",
    subtitle: "For Enthusiasts",
    description:
      "Faster updates, the leading edge. You know what you're looking for.",
    image: "/img/characters/leaping.webp",
    supportedArch: ["x86"],
    recommended: false,
  },
];

const BLUEFIN_DOWNLOAD_URL = "https://download.projectbluefin.io/%TEMPLATE%";

export default function Chooser(): React.JSX.Element {
  const [imageName, setImageName] = useState<ImageState>({
    arch: undefined,
    base: "bluefin",
    gpu: undefined,
    stream: undefined,
    kernel: undefined,
    imagesrc: undefined,
  });
  const [selectedRelease, setSelectedRelease] = useState<string | undefined>(
    undefined,
  );
  const [showArchitectureStep, setShowArchitectureStep] = useState(false);
  const [showKernelStep, setShowKernelStep] = useState(false);
  const [showGpuStep, setShowGpuStep] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  // Use shared hook for version information - single source of truth
  const streamVersions = useStreamVersions();

  const getFormattedImageName = (): string => {
    let final_name = imageName.base;

    if (imageName.gpu === "nvidia") {
      if (imageName.stream === "lts") {
        final_name += "-gdx";
      } else {
        final_name += "-nvidia-open";
      }
    }

    final_name += "-" + imageName.stream;

    // Add HWE suffix for LTS streams with hardware enablement
    // Skip HWE for GDX (LTS + Nvidia) as bluefin-gdx-lts-hwe-x86_64.iso does not exist
    if (
      imageName.stream === "lts" &&
      imageName.kernel === "hwe" &&
      imageName.gpu !== "nvidia"
    ) {
      final_name += "-hwe";
    }

    switch (imageName.arch) {
      case "x86":
        final_name += "-x86_64";
        break;
      case "arm":
        final_name += "-aarch64";
        break;
    }

    return final_name;
  };

  const selectRelease = (releaseId: string) => {
    setSelectedRelease(releaseId);
    setImageName({
      ...imageName,
      stream: releaseId,
      imagesrc: releases.find((r) => r.id === releaseId)?.image,
    });
    setShowArchitectureStep(true);
    setShowKernelStep(false);
    setShowGpuStep(false);
    setShowDownload(false);
  };

  const selectArchitecture = (arch: string) => {
    let newImageName = { ...imageName, arch };

    // Apply ARM restrictions like in original component
    if (arch === "arm" && imageName.stream !== "lts") {
      newImageName.stream = "lts";
      setSelectedRelease("lts");
      newImageName.imagesrc = "/img/characters/achillobator.webp";
    }

    setImageName(newImageName);
    setShowKernelStep(false);
    setShowGpuStep(true);
    setShowDownload(false);
  };

  const selectKernel = (kernel: string) => {
    setImageName({ ...imageName, kernel });
    setShowGpuStep(false);
    setShowDownload(true);
  };

  const selectGpu = (gpu: string) => {
    let newImageName = { ...imageName, gpu };

    // For LTS stream: if Nvidia selected, skip kernel question and go to download
    // If non-Nvidia selected, show kernel question
    if (imageName.stream === "lts") {
      if (gpu === "nvidia") {
        // Skip kernel question for Nvidia users - they get GDX which doesn't have HWE option
        newImageName.kernel = "regular"; // Default for GDX
        setImageName(newImageName);
        setShowKernelStep(false);
        setShowDownload(true);
      } else {
        // Show kernel question for non-Nvidia users
        setImageName(newImageName);
        setShowKernelStep(true);
        setShowDownload(false);
      }
    } else {
      // For non-LTS streams, go straight to download
      newImageName.kernel = "regular"; // Default for non-LTS
      setImageName(newImageName);
      setShowKernelStep(false);
      setShowDownload(true);
    }
  };

  const getSelectedRelease = () => {
    return releases.find((r) => r.id === selectedRelease);
  };

  const getSupportedArchitectures = () => {
    const release = getSelectedRelease();
    if (!release) return [];

    return release.supportedArch.map((arch) => ({
      id: arch,
      label: arch === "x86" ? "x86_64 (Standard for most computers)" : "ARM64",
      available: true,
    }));
  };

  const reset = () => {
    setSelectedRelease(undefined);
    setImageName({
      arch: undefined,
      base: "bluefin",
      gpu: undefined,
      stream: undefined,
      kernel: undefined,
      imagesrc: undefined,
    });
    setShowArchitectureStep(false);
    setShowKernelStep(false);
    setShowGpuStep(false);
    setShowDownload(false);
  };

  return (
    <Layout
      title="Choose Your Bluefin ISO"
      description="Interactive image selector to choose the right Bluefin ISO for your system"
    >
      <main className={styles.chooserMain}>
        <div className={styles.imageChooser}>
          {/* Release Selection */}
          {!selectedRelease && (
            <div className={styles.releaseSelection}>
              <div className={styles.releaseGrid}>
                {releases.map((release) => (
                  <div
                    key={release.id}
                    className={`${styles.releaseBox} ${release.recommended ? styles.recommended : ""}`}
                    onClick={() => selectRelease(release.id)}
                  >
                    <div
                      className={styles.releaseImage}
                      style={{ backgroundImage: `url(${release.image})` }}
                    >
                      {release.recommended && (
                        <span className={styles.recommendedBadge}>
                          Recommended
                        </span>
                      )}

                      <div className={styles.releaseOverlay}>
                        <div className={styles.releaseContent}>
                          <div className={styles.releaseHeader}>
                            <h3 className={styles.releaseTitle}>
                              {release.title}
                            </h3>
                            <span className={styles.releaseSubtitle}>
                              {release.subtitle}
                            </span>
                          </div>
                          <p className={styles.releaseDescription}>
                            {release.description}
                          </p>

                          {/* Version Information */}
                          {streamVersions[
                            release.id as keyof typeof streamVersions
                          ] &&
                            "base" in
                              streamVersions[
                                release.id as keyof typeof streamVersions
                              ]! && (
                              <div className={styles.versionInfo}>
                                <div className={styles.versionItem}>
                                  <span className={styles.versionLabel}>
                                    Base:
                                  </span>
                                  <span className={styles.versionValue}>
                                    {
                                      (
                                        streamVersions[
                                          release.id as keyof typeof streamVersions
                                        ] as any
                                      )?.base
                                    }
                                  </span>
                                </div>
                                <div className={styles.versionItem}>
                                  <span className={styles.versionLabel}>
                                    GNOME:
                                  </span>
                                  <span className={styles.versionValue}>
                                    {
                                      (
                                        streamVersions[
                                          release.id as keyof typeof streamVersions
                                        ] as any
                                      )?.gnome
                                    }
                                  </span>
                                </div>
                                <div className={styles.versionItem}>
                                  <span className={styles.versionLabel}>
                                    Kernel:
                                  </span>
                                  <span className={styles.versionValue}>
                                    {
                                      (
                                        streamVersions[
                                          release.id as keyof typeof streamVersions
                                        ] as any
                                      )?.kernel
                                    }
                                  </span>
                                </div>
                                {release.id === "lts" &&
                                  (
                                    streamVersions[
                                      release.id as keyof typeof streamVersions
                                    ] as any
                                  )?.hwe && (
                                    <div className={styles.versionItem}>
                                      <span className={styles.versionLabel}>
                                        HWE Kernel:
                                      </span>
                                      <span className={styles.versionValue}>
                                        {
                                          (
                                            streamVersions[
                                              release.id as keyof typeof streamVersions
                                            ] as any
                                          )?.hwe
                                        }
                                      </span>
                                    </div>
                                  )}
                                <div className={styles.versionItem}>
                                  <span className={styles.versionLabel}>
                                    MESA:
                                  </span>
                                  <span className={styles.versionValue}>
                                    {
                                      (
                                        streamVersions[
                                          release.id as keyof typeof streamVersions
                                        ] as any
                                      )?.mesa
                                    }
                                  </span>
                                </div>
                                <div className={styles.versionItem}>
                                  <span className={styles.versionLabel}>
                                    Nvidia:
                                  </span>
                                  <span className={styles.versionValue}>
                                    {
                                      (
                                        streamVersions[
                                          release.id as keyof typeof streamVersions
                                        ] as any
                                      )?.nvidia
                                    }
                                  </span>
                                </div>
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Selection */}
          {selectedRelease && showArchitectureStep && !imageName.arch && (
            <div className={styles.stepSelection}>
              <div className={styles.stepHeader}>
                <button className={styles.backButton} onClick={reset}>
                  ← Back to releases
                </button>
                <h3>
                  Which architecture will you install Bluefin on? Older
                  BIOS-based systems are unsupported
                </h3>
              </div>
              <div className={styles.optionsGrid}>
                {getSupportedArchitectures().map((arch) => (
                  <button
                    key={arch.id}
                    className={styles.optionButton}
                    disabled={!arch.available}
                    onClick={() => selectArchitecture(arch.id)}
                  >
                    {arch.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Kernel Selection (only for LTS) */}
          {showKernelStep && !imageName.kernel && (
            <div className={styles.stepSelection}>
              <div className={styles.stepHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => {
                    setShowGpuStep(true);
                    setImageName({ ...imageName, gpu: undefined });
                    setShowKernelStep(false);
                  }}
                >
                  ← Back
                </button>
                <h3>
                  What is your priority? This choice balances system stability
                  with support for the newest hardware. You can change this
                  later:
                </h3>
              </div>
              <div className={styles.optionsGrid}>
                <button
                  className={styles.optionButton}
                  onClick={() => selectKernel("regular")}
                >
                  LTS Linux kernel: The most reliable option, perfect for most
                  computers.
                </button>
                <button
                  className={styles.optionButton}
                  onClick={() => selectKernel("hwe")}
                >
                  Latest Linux kernel: Best for brand-new devices and getting
                  the newest features.
                </button>
              </div>
            </div>
          )}

          {/* GPU Selection */}
          {showGpuStep && !imageName.gpu && (
            <div className={styles.stepSelection}>
              <div className={styles.stepHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => {
                    setShowArchitectureStep(true);
                    setImageName({ ...imageName, arch: undefined });
                    setShowGpuStep(false);
                  }}
                >
                  ← Back
                </button>
                <h3>
                  Who is the vendor of your primary graphics card (GPU)? Older
                  Nvidia cards are unsupported
                </h3>
              </div>
              <div className={styles.optionsGrid}>
                <button
                  className={styles.optionButton}
                  onClick={() => selectGpu("amd")}
                >
                  AMD or Intel
                </button>
                <button
                  className={styles.optionButton}
                  onClick={() => selectGpu("nvidia")}
                >
                  Nvidia RTX or GTX 16xx+ Series
                </button>
              </div>
            </div>
          )}

          {/* Download Section */}
          {showDownload && (
            <div className={styles.downloadSection}>
              <div className={styles.stepHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => {
                    // If we came from kernel step (LTS + non-Nvidia), go back to kernel step
                    // Otherwise go back to GPU step
                    if (imageName.stream === "lts" && imageName.gpu === "amd") {
                      setShowKernelStep(true);
                      setImageName({ ...imageName, kernel: undefined });
                      setShowDownload(false);
                    } else {
                      setShowGpuStep(true);
                      setImageName({ ...imageName, gpu: undefined });
                      setShowDownload(false);
                    }
                  }}
                >
                  ← Back
                </button>
                <h3>Ready to download!</h3>
              </div>

              <div className={styles.downloadSummary}>
                <div className={styles.decisionSummary}>
                  <h4>Your Selection ...</h4>
                  <div className={styles.decisionItems}>
                    <div className={styles.decisionItem}>
                      <span className={styles.decisionLabel}>Release:</span>
                      <span className={styles.decisionValue}>
                        {imageName.gpu === "nvidia" &&
                        imageName.stream === "lts"
                          ? "Bluefin GDX"
                          : getSelectedRelease()?.title}
                      </span>
                      <span className={styles.decisionSubtitle}>
                        {getSelectedRelease()?.subtitle}
                      </span>
                    </div>
                    <div className={styles.decisionItem}>
                      <span className={styles.decisionLabel}>
                        Architecture:
                      </span>
                      <span className={styles.decisionValue}>
                        {imageName.arch === "x86" ? "x86_64" : "ARM64"}
                      </span>
                      <span className={styles.decisionSubtitle}>
                        {imageName.arch === "x86"
                          ? "Standard for most computers (AMD and Intel)"
                          : "ARM-based systems"}
                      </span>
                    </div>
                    {imageName.stream === "lts" && (
                      <div className={styles.decisionItem}>
                        <span className={styles.decisionLabel}>Kernel:</span>
                        <span className={styles.decisionValue}>
                          {imageName.kernel === "hwe"
                            ? "Hardware Enablement (HWE)"
                            : "Regular LTS"}
                        </span>
                        <span className={styles.decisionSubtitle}>
                          {imageName.kernel === "hwe"
                            ? "Regularly updated kernels for better hardware support"
                            : "Stable kernel updates, locked to 6.12.0 with backports"}
                        </span>
                      </div>
                    )}
                    <div className={styles.decisionItem}>
                      <span className={styles.decisionLabel}>GPU:</span>
                      <span className={styles.decisionValue}>
                        {imageName.gpu === "amd" ? "AMD/Intel" : "Nvidia"}
                      </span>
                      <span className={styles.decisionSubtitle}>
                        {imageName.gpu === "amd"
                          ? "Integrated AMD or Intel graphics"
                          : "Nvidia RTX/GTX 16xx+ series, GTX 10xx series and below unsupported"}
                      </span>
                    </div>
                  </div>
                  <div className={styles.generatedFilename}>
                    <span className={styles.filenameLabel}>
                      Installation ISO:
                    </span>
                    <span className={styles.filenameValue}>
                      {getFormattedImageName()}.iso
                    </span>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <div className={styles.downloadActions}>
                  <a
                    className={styles.downloadButton}
                    href={BLUEFIN_DOWNLOAD_URL.replace(
                      "%TEMPLATE%",
                      getFormattedImageName() + ".iso",
                    )}
                  >
                    Download the ISO
                    <svg
                      className={styles.downloadIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                    </svg>
                  </a>

                  <div className={styles.secondaryActions}>
                    <a
                      className={styles.btn}
                      title="Verify (SHA256)"
                      href={BLUEFIN_DOWNLOAD_URL.replace(
                        "%TEMPLATE%",
                        getFormattedImageName() + ".iso-CHECKSUM",
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
                      </svg>
                      Verify (SHA256)
                    </a>
                    <a
                      className={styles.btn}
                      title="View details on the GitHub Container Registry"
                      href="https://github.com/orgs/ublue-os/packages?repo_name=bluefin"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                      View Registry
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.documentationNote}>
                <p>
                  Check out the{" "}
                  <a href="https://docs.projectbluefin.io/">
                    Bluefin Documentation
                  </a>
                  , it takes about 15 minutes and includes an installation
                  runbook - set yourself up for success, you are headed into a
                  new world.
                </p>
                <p>
                  Can't find what you're looking for? Check{" "}
                  <a href="https://docs.projectbluefin.io/downloads/">
                    the full list of downloads
                  </a>
                  .
                </p>
                <p>
                  If you choose secure boot during installation, the password is{" "}
                  <code>universalblue</code>.
                </p>
              </div>

              <button className={styles.startOverButton} onClick={reset}>
                Choose a different release
              </button>
            </div>
          )}
        </div>
      </main>
    </Layout>
  );
}
