"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, Users, Bell } from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content:
        "We collect information you provide directly to us, including name, email address, phone number, shipping address, billing information, and any other information you choose to provide. We also automatically collect certain information about your device and how you interact with our website.",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content:
        "We use the information we collect to process your orders, communicate with you, improve our services, and send you marketing communications (with your consent). We may also use your information to detect, prevent, and address fraud and security issues.",
    },
    {
      icon: Users,
      title: "Information Sharing",
      content:
        "We do not sell your personal information. We may share your information with service providers who assist us in operating our website and conducting our business, such as payment processors and shipping companies. These parties are bound by confidentiality agreements.",
    },
    {
      icon: Shield,
      title: "Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.",
    },
    {
      icon: Lock,
      title: "Your Rights",
      content:
        "You have the right to access, correct, or delete your personal information. You may also object to or restrict certain processing of your data. To exercise these rights, please contact us using the information provided below.",
    },
    {
      icon: Bell,
      title: "Cookies and Tracking",
      content:
        "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
    },
  ];

  const dataTypes = [
    "Contact information (name, email, phone)",
    "Billing and shipping addresses",
    "Payment information (processed securely)",
    "Order history and preferences",
    "Website usage data and analytics",
    "Device and browser information",
  ];

  const yourChoices = [
    "Opt out of marketing communications",
    "Disable cookies in your browser",
    "Request access to your data",
    "Request correction of your data",
    "Request deletion of your data",
    "Object to data processing",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="border-gray-200 mb-12">
          <CardContent className="py-8">
            <p className="text-muted-foreground leading-relaxed">
              At J&K Cabinetry, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services. Please
              read this privacy policy carefully.
            </p>
          </CardContent>
        </Card>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card
                key={index}
                className="border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <CardContent className="py-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-3">
                        {section.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Data Types */}
        <Card className="border-gray-200 mb-8">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Types of Data We Collect
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dataTypes.map((type, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Database className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{type}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Your Choices */}
        <Card className="border-gray-200 mb-12">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Your Privacy Choices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {yourChoices.map((choice, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{choice}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Third-Party Links */}
        <Card className="border-gray-200 mb-12">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Third-Party Websites
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </CardContent>
        </Card>

        {/* Children's Privacy */}
        <Card className="border-gray-200 mb-12">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Children&apos;s Privacy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to children under 13 years of age. We
              do not knowingly collect personal information from children under
              13. If you believe we have collected information from a child under
              13, please contact us immediately.
            </p>
          </CardContent>
        </Card>

        {/* Updates to Policy */}
        <Card className="border-gray-200 mb-12">
          <CardContent className="py-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Changes to This Policy
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;Last updated&quot; date. Your continued use of our
              services after such modifications constitutes your acknowledgment
              and acceptance of the modified policy.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-gray-200 bg-primary/5">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Questions About Privacy?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you have any questions or concerns about this Privacy Policy or
              our data practices, please don&apos;t hesitate to contact us. We&apos;re here
              to help protect your privacy.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Us
              </button>
              <button className="border-2 border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                Email Privacy Team
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
