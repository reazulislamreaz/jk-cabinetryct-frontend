"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the J&K Cabinetry website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these Terms and Conditions, please do not use this service.",
    },
    {
      title: "2. Use License",
      content:
        "Permission is granted to temporarily download one copy of the materials (information or software) on J&K Cabinetry's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.",
      subsections: [
        "You may not modify or copy the materials",
        "You may not use the materials for any commercial purpose",
        "You may not attempt to decompile or reverse engineer any software",
        "You may not remove any copyright or other proprietary notations",
      ],
    },
    {
      title: "3. Product Information",
      content:
        "We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. In the event of an error, we reserve the right to correct such errors and revise orders.",
    },
    {
      title: "4. Orders and Payment",
      content:
        "All orders are subject to acceptance and availability. We reserve the right to refuse any order. Payment must be received before orders are processed. We accept various payment methods as displayed on our website.",
    },
    {
      title: "5. Shipping and Delivery",
      content:
        "Delivery times are estimates and not guaranteed. J&K Cabinetry is not liable for delays in delivery. Risk of loss and title for items pass to you upon delivery to the carrier.",
    },
    {
      title: "6. Returns and Refunds",
      content:
        "Custom-made cabinets are non-returnable unless defective. Stock items may be returned within 30 days in original condition. Restocking fees may apply. Shipping costs are non-refundable.",
    },
    {
      title: "7. Warranties",
      content:
        "Our products come with manufacturer warranties as specified. We disclaim all other warranties, express or implied, including warranties of merchantability and fitness for a particular purpose.",
    },
    {
      title: "8. Limitation of Liability",
      content:
        "J&K Cabinetry shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services.",
    },
    {
      title: "9. Governing Law",
      content:
        "These terms shall be governed by and construed in accordance with the laws of the state in which J&K Cabinetry operates, without regard to its conflict of law provisions.",
    },
    {
      title: "10. Changes to Terms",
      content:
        "We reserve the right to modify these terms at any time. Your continued use of the website following any changes indicates your acceptance of the new terms.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: January 2024
          </p>
        </div>

        {/* Introduction */}
        <Card className="border-gray-200 mb-8">
          <CardContent className="py-8">
            <p className="text-muted-foreground leading-relaxed">
              Welcome to J&K Cabinetry. These Terms and Conditions outline the
              rules and regulations for the use of our website and services.
              Please read these terms carefully before using our website or
              placing an order.
            </p>
          </CardContent>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="border-gray-200">
              <CardContent className="py-6">
                <h2 className="text-xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.subsections && (
                  <ul className="space-y-2 ml-6">
                    {section.subsections.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Section */}
        <Card className="border-gray-200 mt-12 bg-primary/5">
          <CardContent className="py-8 text-center">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Questions About Our Terms?
            </h3>
            <p className="text-muted-foreground mb-6">
              If you have any questions about these Terms and Conditions, please
              contact us.
            </p>
            <button className="bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors">
              Contact Us
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsAndConditions;
