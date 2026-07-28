import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Craftwork from "../../assets/icons/Craftwork.svg";
import heroMobile1x from "../../assets/images/hero_mob_big_1x.png";
import heroMobile2x from "../../assets/images/hero_mob_big_2x.png";
import heroTablet1x from "../../assets/images/hero_tab_1x.png";
import heroTablet2x from "../../assets/images/hero_tab_2x.png";
import heroDesktop1x from "../../assets/images/hero_desk_1x.png";
import heroDesktop2x from "../../assets/images/hero_desk_2x.png";
import css from "./RegisterPage.module.css";

export default function RegisterPage() {
  return (
    <section className={css.RegisterPage}>
      <div className={css.container}>
        <header className={css.logo}>
          <img src={Craftwork} alt="Vocab Builder logo" />
          <h1 className={css.logoName}>VocabBuilder</h1>
        </header>

        <div className={css.content}>
          <div className={css.rightSide}>
            <div className={css.illustration}>
              <picture className={css.heroImg}>
                <source
                  media="(min-width: 1440px)"
                  srcSet={`${heroDesktop1x} 1x, ${heroDesktop2x} 2x`}
                />

                <source
                  media="(min-width: 768px)"
                  srcSet={`${heroTablet1x} 1x, ${heroTablet2x} 2x`}
                />

                <img
                  src={heroMobile1x}
                  srcSet={`${heroMobile2x} 2x`}
                  alt="Hero illustration"
                />
              </picture>
            </div>
            <p className={css.meta}>
              Word <span className={css.dot}>·</span>
              Translation <span className={css.dot}>·</span>
              Grammar <span className={css.dot}>·</span>
              Progress
            </p>
          </div>

          <div className={css.leftSide}>
            <RegisterForm />
          </div>
        </div>
      </div>

      <p className={css.metaTablet}>
        Word <span className={css.dot}>·</span>
        Translation <span className={css.dot}>·</span>
        Grammar <span className={css.dot}>·</span>
        Progress
      </p>
    </section>
  );
}
