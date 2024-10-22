import Image from "next/image";
import avtProfile from "../../../public/images/Avatar-profile.jpeg";
import Tag from "@/components/data-display/tag";
import Container from "@/components/layout/container";
import Typography from "@/components/general/typography";
import Link from "@/components/navigation/link";
import { EXTERNAL_LINKS } from "@/lib/data";
import Reavel from "@/hooks/Reavel";
import spaceGrotesk from "../general/space-grotesk-font";

const AboutMeSection = () => {
  return (
    <Container className="bg-gray-50" id="about">
      <div className="self-center">
        <Tag className={`${spaceGrotesk.className} text-xl`} label="Giới thiệu về tôi" />
      </div>

      <div className="flex w-full flex-col justify-between gap-12 md:flex-row">
        {/* Image */}
        <div className="flex justify-center md:order-first md:justify-end">
          <Reavel>
            <div className="relative h-[380px] w-[320px] md:h-[460px] md:w-[380px] lg:h-[520px] lg:w-[440px]">
              <Image
                src={avtProfile}
                alt="Ảnh đại diện"
                className="absolute z-10 h-[360px] w-[280px] border-8 border-gray-50 max-md:left-5 md:right-0 md:top-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"
                style={{ objectFit: "cover" }}
              ></Image>
              <div className="absolute h-[360px] w-[320px] border-8 border-transparent bg-gray-200 max-md:top-5 md:bottom-0 md:left-0 md:h-[420px] md:w-[340px] lg:h-[480px] lg:w-[400px]"></div>
            </div>
          </Reavel>
        </div>

        {/* Content */}
        <div className="flex max-w-xl flex-col gap-6">
          <Reavel>
            <Typography
              variant="h5"
              className={`${spaceGrotesk.className} text-lg`}
            >
              Xin chào,
            </Typography>
          </Reavel>

          <Reavel>
            <Typography className={`${spaceGrotesk.className} text-lg`}>
              
              Tôi là Nguyễn Đình Nhân, sinh năm 2005, đến từ Gia Lai, Việt Nam. Tôi đam mê lập trình và công nghệ, luôn khao khát học hỏi để phát triển kỹ năng của mình. Ngoài ra, tôi cũng rất thích đá bóng, xem phim và chơi game. Mặc dù chưa có nhiều kinh nghiệm tự tạo dự án, tôi tin rằng mỗi thử thách sẽ giúp tôi tiến xa hơn trên con đường lập trình.
            </Typography>
          </Reavel>

<Reavel>
            <Typography
              variant="h5"
              className={`${spaceGrotesk.className} text-lg`}
            >
              Châm ngôn:
            </Typography>
          </Reavel>
          
          <Reavel>
            <Typography className={`${spaceGrotesk.className} text-lg text-zinc-700`}>
              &quot;Cuộc đời giống như một chiếc bánh pizza, có thể không hoàn hảo, nhưng vẫn ngon nếu bạn có đủ phô mai😆&quot;
            </Typography>
          </Reavel>
          
          <Reavel>
            <Typography
              variant={"h6"}
              className={`${spaceGrotesk.className} text-lg font-bold`}
            >
              Gmail:
            </Typography>
          </Reavel>

          <Reavel>
          <Typography className={`${spaceGrotesk.className} text-lg`}>          <span>{" "}
              <Link
                noCustomization
                externalLink
                withUnderline
                href={EXTERNAL_LINKS.Gmail}
              >
                kiryosdinhnhan@hotmail.com
              </Link>{" "}</span>
            </Typography>
            </Reavel>
        </div>
      </div>
    </Container>
  );
};

export default AboutMeSection;
