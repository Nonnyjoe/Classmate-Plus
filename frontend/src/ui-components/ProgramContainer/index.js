import { useRouter } from "next/router";

const ProgramContainer = ({ image }) => {
  const router = useRouter();

  // const onNFTCardContainerClick = useCallback(() => {
  //   router.push({
  //     pathname: `/student`,
  //   });
  // }, [router]);

  return (
    <div className="items-start justify-start w-[400px] m-auto gap-3 text-left text-3xl">
      <div className="flex-1 rounded-xl text-white bg-[#000] min-h-[300x] flex flex-col items-center justify-start cursor-pointer">
        <div className="self-stretch rounded-t-xl rounded-b-none flex flex-col items-start justify-start">
          <img
            className="self-stretch relative rounded-t-xl rounded-b-none max-w-full overflow-hidden h-[295px] shrink-0 object-cover"
            alt=""
            src={image}
          />
        </div>
        <div className="self-stretch flex flex-col pt-5 px-[30px] pb-[25px] items-start justify-start gap-[25px]">
          <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
            <div className="self-stretch relative leading-[140%] capitalize font-semibold">
              Programme Name
            </div>
            <div className="self-stretch flex flex-row items-start justify-start gap-[12px] text-base font-light">
              <div className="flex flex-row items-start justify-start">
                <div className="relative w-6 h-6 shrink-0">
                  <img
                    className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-xl max-w-full overflow-hidden max-h-full object-cover"
                    alt=""
                    src="/Avatar.png"
                  />
                </div>
              </div>
              <div className="flex-1 relative leading-[140%]">School Name</div>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start text-xs font-light">
            <div className="flex-1 flex flex-col py-0 pr-[21px] pl-0 items-start justify-start gap-[8px]">
              <div className="self-stretch relative text-gray-400 leading-[110%]">
                Role
              </div>
              <div className="self-stretch relative text-xl leading-[140%]">
                Admin
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[8px] justify-center items-end text-right">
              <div className="self-stretch relative text-gray-400 leading-[110%]">
                Status
              </div>
              <div className="self-stretch relative text-xl leading-[140%]">
                Ongoing
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramContainer;
