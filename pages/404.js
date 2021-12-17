import { Images } from "../constants";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}

export default function Page404() {
  const { t } = useTranslation();
  return (
    <div
      className="p-3"
      style={{ backgroundImage: `url(${Images.Poly?.default?.src})` }}
    >
      <Image
        className="self-start m-4"
        layout="fixed"
        src={Images.LogoBlue.default?.src}
        alt="logo"
        width={140}
        height={50}
      />
      <div className="grid justify-items-center h-screen">
        <h1 className="text-7xl self-end text-gray-600 my-3">404</h1>
        <p className="text-4xl text-gray-400">{t("text_page_not_found")}</p>
      </div>
    </div>
  );
}
