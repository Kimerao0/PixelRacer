import React from "react";
import { SiteSection } from "../../App";
import { styled } from "@mui/material";

const TeamsSection: React.FC<{
  setActiveSection: React.Dispatch<React.SetStateAction<SiteSection>>;
}> = ({ setActiveSection }) => {
  return <TeamsSectionWrapper>TeamsSection</TeamsSectionWrapper>;
};

export default TeamsSection;

const TeamsSectionWrapper = styled("div")({
  width: `100vw`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
});
