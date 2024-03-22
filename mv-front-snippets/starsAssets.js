import knowStar from "assets/images/logo-homepage-star-know.svg";
import applyStar from "assets/images/logo-homepage-star-apply.svg";
import learnStar from "assets/images/logo-homepage-star-learn.svg";
import convinceStar from "assets/images/logo-homepage-star-convince.svg";

import GroupStarEnum from "./enums/GroupStarEnum";

export const starsAssets = {
  // ** Convaincre en entretien
  [GroupStarEnum.KNOW]: knowStar,
  // ** Savoir postuler
  [GroupStarEnum.APPLY]: applyStar,
  // ** Se former à  un métier,
  [GroupStarEnum.LEARN]: learnStar,
  // ** Se connaître,
  [GroupStarEnum.CONVINCE]: convinceStar,
};

export default starsAssets;
