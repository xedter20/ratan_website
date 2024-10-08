// images
import trophySvg from "../../assets/logo/trophy.svg";
import guaranteeSvg from "../../assets/logo/guarantee.svg";
import shippingSvg from "../../assets/logo/shipping.svg";
import supportSvg from "../../assets/logo/customer-support.svg";

const ServicesHighlight = () => {
  return (
    <section className="flex flex-col flex-wrap items-center gap-y-6 bg-[#FAF3EA] py-16 pl-[4%] md:flex-row md:justify-evenly md:py-24 md:pr-[7%]">
      <div className="w-full gap-4 md:flex md:justify-evenly xl:w-fit xl:justify-normal xl:gap-6">
        <div className="flex w-4/5 items-center justify-center gap-[10px] md:w-auto md:justify-normal">
          <img
            className="size-11 md:size-12 xl:size-14"
            src={trophySvg}
            alt="trophy logo"
            loading="lazy"
          />
          <div className="w-[242px] xl:w-full">
            <h3 className="text-xl font-semibold text-[#242424] xl:text-[22px]">
              High Quality
            </h3>
            <p className="text-steelGray text-lg">Crafted from top materials</p>
          </div>
        </div>

        <div className="flex w-4/5 items-center justify-center gap-[10px] md:w-auto md:justify-normal">
          <img
            className="size-11 md:size-12 xl:size-14"
            src={guaranteeSvg}
            alt="guarantee logo"
            loading="lazy"
          />
          <div className="w-[242px] xl:w-full">
            <h3 className="text-xl font-semibold text-[#242424] xl:text-[22px]">
              Warranty Protection
            </h3>
            <p className="text-steelGray text-lg">Over 6 Months</p>
          </div>
        </div>
      </div>

      <div className="w-full md:flex md:justify-evenly xl:w-fit xl:justify-normal xl:gap-6">
        {/* <div className="flex w-4/5 items-center justify-center gap-[10px] md:w-auto md:justify-normal">
          <img
            className="size-11 md:size-12 xl:size-14"
            src={shippingSvg}
            alt="shipping logo"
            loading="lazy"
          />
          <div className="w-[242px] xl:w-full">
            <h3 className="text-xl font-semibold text-[#242424] xl:text-[22px]">
              Free Shipping
            </h3>
            <p className="text-steelGray text-lg">Order over 150</p>
          </div>
        </div> */}

        <div className="flex w-4/5 items-center justify-center gap-[10px] md:w-auto md:justify-normal">
          <img
            className="size-11 md:size-12 xl:size-14"
            src={supportSvg}
            alt="customer-support logo"
            loading="lazy"
          />
          <div className="w-[242px] xl:w-full">
            <h3 className="text-xl font-semibold text-[#242424] xl:text-[22px]">
              Support
            </h3>
            <p className="text-steelGray text-lg">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHighlight;
