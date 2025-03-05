import React from "react";
import notFound from "@/assets/images/404.svg";

const NotFound:React.FC = ({ title }: any) => {
    return (
        <>
            <div className="px-6 py-16 lg:py-20 flex flex-wrap content-center">
                {title ? (
                    <div className="block justify-items-stretch mx-auto items-center text-center">
                        <h2 className="font-bold font-serif font-2xl lg:text-4xl leading-7 mb-4">
                            {title}
                        </h2>
                    </div>
                ) : (
                    <div className="block justify-items-stretch mx-auto items-center text-center">
                        <img width={550} height={350} src={notFound} alt="404" />
                        <h2 className="font-bold font-serif font-2xl lg:text-4xl leading-7 mb-4">
                            Page not found!
                        </h2>
                    </div>
                )}
            </div>
        </>
    );
};

export default NotFound;
