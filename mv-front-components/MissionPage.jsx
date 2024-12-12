import React from "react";
import { useTranslation } from "react-i18next";
import Interweave from "interweave";
import { useHistory, NavLink, Link } from "react-router-dom";
import { mdiArrowLeft } from "@mdi/js";
import { v4 as uuidv4 } from "uuid";
import clsx from "clsx";
import { Roll, LightSpeed, Bounce, Fade } from "react-reveal";
import Jump from "react-reveal/Jump";

import foundersAndPartners from "utils/translations/fr/foundersPartners.json";
import clickDownloadActivitiesReportDataGA from "config/googleAnalytics/clickDownloadActivitiesReportDataGA";
import {
  getMissionPicturesUrlFromFirebaseDevStorage,
  getDocumentsPDFUrlFromFirebaseDevStorage,
} from "utils/helpers/assetsHelpers";

import { useMediaQueries } from "hooks/useMediaQueries";

import NewsPublicationsCarousel from "components/common/NewsPublicationsCarousel(ToBeDeleted)/NewsPublicationsCarousel";
import ButtonScrollTopPage from "components/ButtonScrollTopPage";
import MdiIconButton from "components/common/MdiIconButton";
import VideosCarousel from "components/common/VideosCarousel/VideosCarousel";
import Button from "components/common/Button(ToBeUpdated)";

import logoImage from "assets/images/logo-mv.svg";
import arrowImage from "assets/images/missionPage-arrow.png";
import videoLogo01 from "assets/images/missionPage-video-logo01.png";
import videoLogo02 from "assets/images/missionPage-video-logo02.png";

import MissionPageStyles from "./MissionPage.module.scss";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const MissionPage = () => {
  const { t } = useTranslation("mission");
  const { isMobile, isTablet } = useMediaQueries();
  const history = useHistory();

  const {
    leftBlockNumber,
    leftBlockText,
    rightBlockNumber,
    rightBlockText,
    rightBlockSource,
    arrowImageAlt,
    firstDescription,
    downloadPDF,
    downloadButton,
  } = t("missionContent", {
    returnObjects: true,
  });
  const {
    testimony_01,
    testimony_01_name,
    testimony_02,
    testimony_02_name,
    testimony_03,
    testimony_03_name,
    testimony_03_title,
  } = t("testimonies", {
    returnObjects: true,
  });
  const { secondDescription_1, secondDescription_2, secondDescription_3 } = t(
    "secondDescription",
    {
      returnObjects: true,
    }
  );
  const { thirdDescription_1, thirdDescription_2, thirdDescription_3 } = t(
    "thirdDescription",
    {
      returnObjects: true,
    }
  );
  const { videosTitle, videosDescriptionText } = t("videosSection", {
    returnObjects: true,
  });
  const { newsAndPublicationsData } = t("newsAndPublications", {
    returnObjects: true,
  });

  return (
    <main className={MissionPageStyles.container}>
      <MdiIconButton
        buttonStyles={{
          marginLeft: "8px",
          position: "absolute",
          marginTop: "12px",
        }}
        iconWidth={"3rem"}
        iconHeight={"3rem"}
        mdiIcon={mdiArrowLeft}
        color={"white"}
        onClick={() => history.goBack()}
      />
      <section name="top-mission-firstDescription-testimony">
        <div className={MissionPageStyles.top}>
          <div className={MissionPageStyles.logo}>
            <Link to="/">
              <img
                loading="lazy"
                src={logoImage}
                alt={t("logoMaVoieAlt")}
                className={MissionPageStyles.logoImage}
              />
            </Link>
          </div>
          <div className={MissionPageStyles.mission}>
            <Interweave
              tagName="h1"
              className={MissionPageStyles.missionTitle}
              content={t("title")}
            />
            <div className={MissionPageStyles.missionBlock}>
              <div className={MissionPageStyles.missionLeftBlock}>
                <Roll left>
                  <Interweave
                    className={MissionPageStyles.missionBlockNumber}
                    content={leftBlockNumber}
                  />
                </Roll>
                <Interweave
                  tagName="div"
                  className={MissionPageStyles.missionblockText}
                  content={leftBlockText}
                />
              </div>
              <div className={MissionPageStyles.missionRightBlock}>
                <Roll right>
                  <Interweave
                    className={MissionPageStyles.missionBlockNumber}
                    content={rightBlockNumber}
                  />
                </Roll>
                <Interweave
                  tagName="div"
                  className={MissionPageStyles.missionblockText}
                  content={rightBlockText}
                />
                <Interweave
                  tagName="div"
                  className={MissionPageStyles.missionSource}
                  content={rightBlockSource}
                />
              </div>
            </div>
            <div className={MissionPageStyles.arrowDescription}>
              <div className={MissionPageStyles.firstDescription}>
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.firstDescriptionStrongText}
                  content={firstDescription?.[1]}
                />
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.firstDescriptionText}
                  content={firstDescription?.[2]}
                />
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.firstDescriptionText}
                  content={firstDescription?.[3]}
                />
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.missionDownloadPDF}
                  content={downloadPDF}
                />
                <div className={MissionPageStyles.downloadButtonContainer}>
                  <a
                    href={getDocumentsPDFUrlFromFirebaseDevStorage(
                      "Rapportdactivite-VF-MaVoieOrg.pdf"
                    )}
                  >
                    <Button
                      onClick={clickDownloadActivitiesReportDataGA}
                      text={downloadButton}
                      width={100}
                    />
                  </a>
                </div>
              </div>
              <img
                src={arrowImage}
                alt={arrowImageAlt}
                className={MissionPageStyles.arrowImage}
              />
            </div>
          </div>
          <div className={MissionPageStyles.testimony}>
            <img
              src={getMissionPicturesUrlFromFirebaseDevStorage(
                "missionPage-testimony-amira.png"
              )}
              loading="lazy"
              alt={testimony_01_name}
              className={MissionPageStyles.testimonyImage}
            />
            <div className={MissionPageStyles.testimonyText}>
              <LightSpeed right>
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.testimonyParagraphe}
                  content={`" ${testimony_01} ”`}
                />
              </LightSpeed>
              <Interweave
                tagName="div"
                className={MissionPageStyles.testimonyName}
                content={testimony_01_name}
              />
            </div>
          </div>
        </div>
      </section>
      <section
        name="middle-secondDescription-testimony-videos"
        className={MissionPageStyles.middleSection}
      >
        <div className={MissionPageStyles.middleTop}>
          <div className={MissionPageStyles.middleContainer}>
            <Interweave
              tagName="h2"
              className={MissionPageStyles.hiddenText}
              content={t("hiddenText")}
            />
            <Fade bottom>
              <Interweave
                tagName="h2"
                className={MissionPageStyles.secondDescriptionText_1}
                content={secondDescription_1}
              />
              <Interweave
                tagName="p"
                className={MissionPageStyles.secondDescriptionText}
                content={secondDescription_2}
              />
              <Interweave
                tagName="p"
                className={MissionPageStyles.secondDescriptionText}
                content={secondDescription_3}
              />
            </Fade>
          </div>
          <div className={MissionPageStyles.testimony} style={{ width: "36%" }}>
            <div
              className={clsx({
                [MissionPageStyles.testimonyTextMobile]: isMobile,
                [MissionPageStyles.testimonyTextTablet]: isTablet,
                [MissionPageStyles.testimonyText]: true,
              })}
            >
              <LightSpeed left>
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.testimonyParagraphe}
                  content={`" ${testimony_02} "`}
                />
              </LightSpeed>
              <Interweave
                tagName="div"
                className={MissionPageStyles.testimonyName}
                content={testimony_02_name}
              />
            </div>
            <img
              src={getMissionPicturesUrlFromFirebaseDevStorage(
                "missionPage-testimony-imane.png"
              )}
              loading="lazy"
              alt={testimony_02_name}
              className={clsx({
                [MissionPageStyles.testimonyImageMobile]: isMobile,
                [MissionPageStyles.testimonyImageTablet]: isTablet,
                [MissionPageStyles.testimonyImage]: true,
              })}
            />
          </div>
          <div className={MissionPageStyles.videoBackground}>
            <LightSpeed left>
              <img
                src={videoLogo01}
                alt="TikTok Logo"
                loading="lazy"
                className={MissionPageStyles.videoLogo01}
              />
            </LightSpeed>
            <div className={MissionPageStyles.videosContainer}>
              <div className={MissionPageStyles.videoDescription}>
                <Interweave
                  tagName="h2"
                  className={MissionPageStyles.videosTitle}
                  content={videosTitle}
                />
                <Interweave
                  tagName="div"
                  className={MissionPageStyles.videosDescriptionText}
                  content={videosDescriptionText}
                />
              </div>
              <div className={MissionPageStyles.videoCarousel}>
                <VideosCarousel />
              </div>
              <Jump>
                <img
                  src={videoLogo02}
                  alt="videoLogo02"
                  className={MissionPageStyles.videoLogo02}
                />
              </Jump>
            </div>
          </div>
        </div>
      </section>
      <section name="middle-thirdDescription-testimony-partners">
        <div className={MissionPageStyles.middleBottom}>
          <div className={MissionPageStyles.thirdDescription}>
            <Fade bottom>
              <Interweave
                tagName="h2"
                className={MissionPageStyles.thirdDescriptionText_1}
                content={thirdDescription_1}
              />
              <Interweave
                tagName="p"
                className={MissionPageStyles.thirdDescriptionText}
                content={thirdDescription_2}
              />
              <Interweave
                tagName="p"
                className={MissionPageStyles.thirdDescriptionText}
                content={thirdDescription_3}
              />
            </Fade>
          </div>
          <div className={MissionPageStyles.testimony}>
            <img
              src={getMissionPicturesUrlFromFirebaseDevStorage(
                "missionPage-testimony-fatene.png"
              )}
              loading="lazy"
              alt="mavoie"
              className={MissionPageStyles.testimonyImage}
            />
            <div className={MissionPageStyles.testimonyText}>
              <LightSpeed right>
                <Interweave
                  tagName="p"
                  className={MissionPageStyles.testimonyParagraphe}
                  content={`" ${testimony_03} "`}
                />
              </LightSpeed>
              <Interweave
                tagName="div"
                className={MissionPageStyles.testimonyName}
                content={testimony_03_name}
              />
              <Interweave
                tagName="div"
                className={MissionPageStyles.testimonytitle}
                content={testimony_03_title}
              />
            </div>
          </div>
          <div className={MissionPageStyles.partners}>
            <div className={MissionPageStyles.partnersDescription}>
              <Interweave
                tagName="h2"
                className={MissionPageStyles.partnersTitle}
                content={t("partnerTitle")}
              />
              <Interweave
                tagName="p"
                className={MissionPageStyles.partnersDescriptionText}
                content={t("partnerDescriptionText")}
              />
            </div>
            <Bounce right duration={2000}>
              <div className={MissionPageStyles.partnersLogos}>
                <div className={MissionPageStyles.logosCarousel}>
                  {foundersAndPartners.partners?.map((partnerInfo) => (
                    <div key={uuidv4()} className={MissionPageStyles.logos}>
                      <img
                        style={{ width: "55%" }}
                        src={partnerInfo.image}
                        alt={partnerInfo.alt}
                        onClick={() => {
                          window.open(partnerInfo.url, "_blank").focus();
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Bounce>
          </div>
        </div>
      </section>
      <section name="bottom-newPublications-support">
        <div className={MissionPageStyles.newsPublications}>
          <Interweave
            tagName="h2"
            className={MissionPageStyles.newsPublicationsTitle}
            content={t("newsPublicationsTitle")}
          />
          <NewsPublicationsCarousel
            newsAndPublications={newsAndPublicationsData}
          />
        </div>
        <div className={MissionPageStyles.supportMavoieBackground}>
          <Jump>
            <Interweave
              tagName="h2"
              className={MissionPageStyles.supportMavoieTitle}
              content={t("supportMavoieTitle")}
            />
          </Jump>
          <Interweave
            tagName="p"
            className={MissionPageStyles.supportMavoieText}
            content={t("supportMavoieText")}
          />
          <NavLink
            to="/contacter-mavoie"
            className={MissionPageStyles.navLink}
            onClick={scrollToTop}
          >
            <Button text={t("supportMavoieButton")} width={150} />
          </NavLink>
        </div>
      </section>
      <ButtonScrollTopPage />
    </main>
  );
};

export default MissionPage;
