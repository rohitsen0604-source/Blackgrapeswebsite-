import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonical }) => {
  useEffect(() => {
    // Set document title
    const fullTitle = `${title} | BLACKGRAPES SOFTECH`;
    document.title = fullTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Update OG title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", fullTitle);
    }

    // Update OG description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute("content", description);
    }

    // Structured Data JSON-LD
    let script = document.querySelector("#structured-data-jsonld");
    if (!script) {
      script = document.createElement("script");
      script.id = "structured-data-jsonld";
      script.setAttribute("type", "application/ld+json");
      document.head.appendChild(script);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BLACKGRAPES SOFTECH",
      url: window.location.origin,
      logo: `${window.location.origin}/images/image.png`,
      description: "BlackGrapesSofttech builds modern digital products, scalable software and intelligent technology solutions.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vijaynagar, Indore, Madhya Pradesh, India",
        streetAddress: "252-F/H Scheme No 54",
        postalCode: "452010",
        addressCountry: "IN",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-7470997884",
        contactType: "customer service",
        email: "info@blackgrapessoftech.com",
      },
    };
    
    script.textContent = JSON.stringify(schema);
  }, [title, description, canonical]);

  return null;
};
