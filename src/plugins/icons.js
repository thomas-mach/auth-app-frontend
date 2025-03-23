import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faRobot,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
  faUser,
  faXmark,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

// Aggiungi tutte le icone alla libreria
library.add(
  faGithub,
  faLinkedin,
  faRobot,
  faEnvelope,
  faLock,
  faEyeSlash,
  faEye,
  faUser,
  faXmark,
  faTrash
);

// Esporta l'icona per registrarla nel main.js
export { FontAwesomeIcon };
