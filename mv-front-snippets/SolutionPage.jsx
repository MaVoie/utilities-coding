import React, { useState, useEffect, useCallback, useMemo } from "react";
import Fade from "react-reveal/Fade";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import clickPrincipalSolutionDataGA from "config/googleAnalytics/clickPrincipalSolutionDataGA";
import { useMediaQueries } from "hooks/useMediaQueries";
import sendInBlueData from "utils/data/sendInBlueData";
import rdvSolutionData from "utils/data/rdvSolutionData.json";

import ModalMail from "components/common/ModalMail";
import ModalAppointement from "components/common/ModalAppointement";
import SolutionCard from "components/Solutions/SolutionCard";
import SuggestionsSection from "components/Solutions/SuggestionsSection";
import PublicServiceCard from "components/PublicServiceCard";
import EventsCard from "components/EventsCard/EventsCard";

import solutionStyles from "./SolutionPage.module.scss";
import { getTextsForEmailTemplate } from "domain/solution/solutionHooks";
import {
  selectHydratedSolutions,
  selectUserAnswers,
  selectUserEmail,
  selectUserFirstName,
} from "store/users/usersSelectors";
import Button from "components/common/Button";
import Interweave from "interweave";
import { v4 as uuidv4 } from "uuid";
import { SolutionsCardStylesProvider } from "hooks/withSolutionCardStyles";
import { onPopStateHistoryGoBackSkip } from "utils/helpers/windowHelpers";
import MapBranchIdGroupStar from "utils/constants/enums/MapBranchIdGroupStar";

function SolutionPage() {
  const { t } = useTranslation(["solutions", "path"]);
  const history = useHistory();
  const { aid } = useParams();

  const { isMobile, isBigScreen, isDesktop, isTablet } = useMediaQueries();

  const [isMailModalOpen, openMailModal] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(null);

  const hydratedSolutionsResults = useSelector(selectHydratedSolutions);

  const userAnswers = useSelector(selectUserAnswers);
  const userEmail = useSelector(selectUserEmail);
  const userFirstName = useSelector(selectUserFirstName);

  // const principalSolutionsNumber = useMemo(
  //   () => hydratedSolutionsResults?.formations?.length,
  //   [hydratedSolutionsResults?.formations?.length]
  // );

  const { introPublicServiceCard } = t("publicServiceCard", {
    returnObjects: true,
  });
  const { introEventCard } = t("eventsCard", { returnObjects: true });

  const groupStar = MapBranchIdGroupStar[aid];

  useEffect(() => {
    const onPopState = onPopStateHistoryGoBackSkip(history);
    // Add the event listener
    window.addEventListener("popstate", onPopState);
    return () => {
      // Remove the event listener to reset the default behavior
      window.removeEventListener("popstate", onPopState);
    };
  }, [history, aid]);

  // ** Preparing data for the template of the mail

  const {
    responsesTextsForEmailTemplate,
    solutionsTextsForEmailTemplate,
    suggestionsTextsForEmailTemplate,
  } = useMemo(
    () => getTextsForEmailTemplate(userAnswers, hydratedSolutionsResults),
    [hydratedSolutionsResults, userAnswers]
  );

  const handleScrollToView = useCallback(() => {
    isDesktop &&
      document
        .getElementById("rdvCard")
        ?.scrollIntoView({ behavior: "smooth" });
  }, [isDesktop]);

  const handleOnClickCalendly = useCallback(() => {
    clickPrincipalSolutionDataGA({
      solutionNom: rdvSolutionData?.title,
      mailLaisse: Boolean(userEmail),
    });
    window
      .open(
        `${rdvSolutionData?.link}?name=${userFirstName}&email=${userEmail}`,
        "_self"
      )
      .focus();
  }, [userEmail, userFirstName]);

  return (
    <div className={solutionStyles.page}>
      {/* <div
        className={solutionStyles.backgroundSolutionContainer}
        style={{
          backgroundImage: `url(${getSolutionBackgroundsUrlFromFirebaseDevStorage(
            "header-solutions-tablet.svg"
          )})`,
        }}
      >
        <img
          loading="lazy"
          style={{
            width: "62px",
          }}
          src={logoImage}
          alt="productLogo"
        />
        <img
          loading="lazy"
          className={solutionStyles.starIcon}
          src={starsData[groupStar].icon}
          alt="star-logo"
        />
        <div className={solutionStyles.starText}>
          {starsData[groupStar].text}
        </div>
        <div className={solutionStyles.solutionsIntro}>
          {t("solutionsIntroText1")}
        </div>
        <div className={solutionStyles.solutionsNumber}>
          {principalSolutionsNumber > 1
            ? `${principalSolutionsNumber} Solutions`
            : `${principalSolutionsNumber} Solution`}
        </div>
        <div className={solutionStyles.solutionsIntro}>
          {t("solutionsIntroText2")}
        </div>
      </div> */}

      <div className={solutionStyles.allSolutionsContainer}>
        <div className={solutionStyles.arche} />
        {/* Principal Solutions Section */}
        {hydratedSolutionsResults?.formations?.length > 0 && (
          <div className={solutionStyles.mainContainer}>
            <div
              className={clsx({
                [solutionStyles.cardOutContainerB]: isBigScreen,
                [solutionStyles.cardOutContainerD]: isDesktop,
                [solutionStyles.cardOutContainer]: true,
              })}
            >
              <SolutionsCardStylesProvider>
                {hydratedSolutionsResults.formations.map((solution) => (
                  <SolutionCard
                    srcLogo={solution.srcLogo}
                    title={`${solution.name} - ${solution.partner}`}
                    tags={solution.tags}
                    type={solution.type}
                    link={solution.link}
                    listDescriptions={solution.descriptions}
                    openMailModal={openMailModal}
                    setSelectedSolution={setSelectedSolution}
                    key={solution.name}
                  />
                ))}
              </SolutionsCardStylesProvider>
            </div>
          </div>
        )}
        {/* PublicService Section */}
        {hydratedSolutionsResults?.publicServices?.length > 0 && (
          <div className={solutionStyles.publicServicesContainer}>
            <Interweave content={introPublicServiceCard} />
            {hydratedSolutionsResults.publicServices.map((publicService) => (
              <PublicServiceCard
                name={publicService.title}
                srcLogo={publicService.srcLogo}
                link={publicService.link}
                key={uuidv4()}
              />
            ))}
          </div>
        )}
        {/* RDV Section */}
        <div className={solutionStyles.rdvContainer}>
          <div
            className={clsx({
              [solutionStyles.rdvCardTablet]: isTablet,
              [solutionStyles.rdvCardMobile]: isMobile,
              [solutionStyles.rdvCard]: true,
            })}
          >
            <div id="rdvCard">
              <div className={solutionStyles.rdvCardTitle}>
                {rdvSolutionData?.title}
              </div>
            </div>
            <div className={solutionStyles.rdvCardContentDesktop}>
              {rdvSolutionData?.descriptions?.[1] && (
                <div className={solutionStyles.rdvCardDescription2}>
                  {rdvSolutionData.descriptions[1]}
                </div>
              )}
            </div>
            <div className={solutionStyles.rdvCardButtonContainer}>
              <Button
                onClick={handleOnClickCalendly}
                style={{
                  width: "auto",
                  padding: "12px 24px",
                  margin: 0,
                }}
                text={t("calendlyButtonText")}
              />
            </div>
          </div>
        </div>
        {/* Event Section */}
        {hydratedSolutionsResults?.events?.length > 0 && (
          <div
            className={clsx({
              [solutionStyles.eventsContainer]: true,
              [solutionStyles.eventsContainerS]: isMobile,
            })}
          >
            <Interweave content={introEventCard} />
            {hydratedSolutionsResults.events.map((events) => (
              <EventsCard
                name={events.title}
                srcLogo={events.srcLogo}
                ƒ
                link={events.link}
                key={uuidv4()}
              />
            ))}
          </div>
        )}
        {/* Secondary Solutions Section */}
        <SuggestionsSection
          openMailModal={openMailModal}
          setSelectedSolution={setSelectedSolution}
          data={hydratedSolutionsResults.suggestions || []}
        />
      </div>
      <div
        className={clsx({
          [solutionStyles.stickyBottomDesktop]: isDesktop,
          [solutionStyles.stickyBottomMobileTablet]: isMobile || isTablet,
        })}
        onClick={handleScrollToView}
      >
        <Fade bottom>
          <ModalAppointement />
        </Fade>
      </div>
      <ModalMail
        externalOpenMailModal={openMailModal}
        isOpen={isMailModalOpen}
        selectedSolution={selectedSolution}
        solutionsTextsForEmailTemplate={solutionsTextsForEmailTemplate}
        responsesTextsForEmailTemplate={responsesTextsForEmailTemplate}
        suggestionsTextsForEmailTemplate={suggestionsTextsForEmailTemplate}
        sendInBlueStarAttribute={sendInBlueData[groupStar].attribute}
      />
    </div>
  );
}

export default SolutionPage;
