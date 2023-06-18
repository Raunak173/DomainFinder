import { useEffect, useState } from "react";

const useDomains = () => {
  const [domains, setDomains] = useState([]);
  const [dc, setDc] = useState([]);

  useEffect(() => {
    fetch("https://api.propeers.in/api/v1/domains/allDomains")
      .then((res) => res.json())
      .then((data) => {
        setDomains(data);
        const domainsWithColors = data.data.map((domain) => {
          const domainColor = getRandomColor();
          const subdomainsWithColors = domain.domainTags.map((subdomain) => ({
            ...subdomain,
            color: domainColor,
          }));
          return {
            ...domain,
            color: domainColor,
            domainTags: subdomainsWithColors,
          };
        });
        setDc(domainsWithColors);
      });
  }, []);

  return dc;
};

// Helper function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default useDomains;
