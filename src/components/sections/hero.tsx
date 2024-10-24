import { useEffect } from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { Fancybox } from "@fancyapps/ui";
import avtProfile from "../../../public/images/Avatar-profile.jpeg";
import downImg from "../../../public/images/down-circle.gif";
import SocialIcons from "@/components/data-display/social-icons";
import Typography from "@/components/general/typography";
import Container from "@/components/layout/container";
import Reavel from "@/hooks/Reavel";
import ScrollAnimation from "@/hooks/scrollAnimation";
import nunito from "../general/nunito-font";
import spaceGrotesk from "../general/space-grotesk-font";

const HeroSection = () => {
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      Fancybox.bind("[data-fancybox]", {});
    }

    return () => {
      Fancybox.destroy();
    };
  }, []);

  return (
    <Container id="home">
      <div className="flex md:mt-16 md:pt-3 flex-col gap-12 md:flex-row">
        {/* Image */}
        <div className="flex items-center justify-center md:order-last md:flex-grow md:justify-end">
          <ScrollAnimation>
            <Reavel>
              <div className="relative h-[300px] w-[280px] md:h-[360px] md:w-[320px]">
                <a href="/images/Avatar-profile.jpeg" data-fancybox="gallery">
                  <Image
                    src={avtProfile}
                    alt="Ảnh đại diện"
                    className="absolute z-10 h-[280px] w-[240px] border-8 border-gray max-md:left-5 md:left-0 md:top-0 md:h-[320px] md:w-[280px]"
                    style={{ objectFit: "cover" }}
                  />
                </a>
                <div className="absolute h-[280px] w-[280px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:right-0 md:h-[320px] md:w-[280px]"></div>
              </div>
            </Reavel>
          </ScrollAnimation>
        </div>

        {/* Content */}
        <div className="flex max-w-3xl flex-grow flex-col justify-center gap-8 md:order-first md:items-start md:justify-center 2xl:gap-12">
          <div className="flex flex-col gap-2">
            <Reavel>
              <Typography variant="h1" className={`${nunito.className}`}>
                Nguyễn Đình Nhân{" "}
                <span className="inline-flex pt-1.5" style={{ gap: "5px" }}>
                  <Image src={downImg} alt="Web" width={40} height={40} />
                </span>
              </Typography>
            </Reavel>
            <Reavel>
              <Typography className={`${spaceGrotesk.className} text-lg mt-3`}>
                Nguyễn Đình Nhân - một người yêu thích lập trình và công nghệ.
                Mặc dù chưa tự tạo dự án nào, tôi đã sử dụng mã nguồn từ cộng
                đồng để tạo ra portfolio này, đánh dấu bước đầu trong hành trình
                khám phá lập trình của mình. Tôi hy vọng sẽ phát triển thêm kỹ
                năng và tạo ra các sản phẩm độc đáo trong tương lai❗😁
              </Typography>
            </Reavel>
          </div>
          <div className="flex flex-col gap-2">
            <Reavel>
              <div className="flex gap-2">
                <MapPin className="stroke-gray-600" />
                <Typography className={`${spaceGrotesk.className} text-lg`}>
                  From: Gia Lai, VietNam 🇻🇳
                </Typography>
              </div>
            </Reavel>

            <div className="flex items-center gap-2">
              <Reavel>
                <div className="flex h-6 w-6 items-center justify-center">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
                  </span>
                </div>
              </Reavel>
              <Reavel>
                <Typography className={`${spaceGrotesk.className} text-lg`}>
                  Đang hoạt động
                </Typography>
              </Reavel>
            </div>
          </div>
          <Reavel>
            <SocialIcons />
          </Reavel>
        </div>
      </div>
    </Container>
  );
};

export default HeroSection;
