import { FOUNDING_PARTNERS } from "../constants/partners";
import { buildPartnerUrl } from "./partnersHelper(ToBeDeleted)";

describe("Util functions: partners helper", () => {
  describe("buildPartnerUri", () => {
    it("should return uri without params", () => {
      const url = FOUNDING_PARTNERS.jobReady.url;
      const buildedUrl = buildPartnerUrl(url);
      expect(buildedUrl).toEqual(`${url}?`);
    });

    it("should return uri with some params with existing constant url", () => {
      const url = FOUNDING_PARTNERS.jobReady.url;

      const buildedUrl = buildPartnerUrl(url, "101", null, "candidateLastName");
      expect(buildedUrl).toEqual(
        `${url}?maVoieId=101&lastName=candidateLastName`
      );
    });

    it("should return uri with all params with existing constant url", () => {
      const url = FOUNDING_PARTNERS.jobReady.url;

      const buildedUrl = buildPartnerUrl(
        url,
        "101",
        "candidate@Mail.com",
        "candidateLastName",
        "candidateName"
      );
      expect(buildedUrl).toEqual(
        `${url}?maVoieId=101&email=candidate@Mail.com&lastName=candidateLastName&name=candidateName`
      );
    });

    it("should return uri with params with new created url", () => {
      const url = "www.partner-website.com/";

      const buildedUrl = buildPartnerUrl(
        url,
        "101",
        "candidate@Mail.com",
        "candidateLastName",
        "candidateName"
      );
      expect(buildedUrl).toEqual(
        "www.partner-website.com/?maVoieId=101&email=candidate@Mail.com&lastName=candidateLastName&name=candidateName"
      );
    });
  });
});
