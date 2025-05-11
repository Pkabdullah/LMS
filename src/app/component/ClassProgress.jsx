"use client";

import {
    CircularProgressbar,
    buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";




const ClassProgress = () => {
    const classDetails = useSelector((state) => state.user.stdClass);
    const student = useSelector((state) => state.user.students);
console.log("ClassProgrss",student)
    const classData = classDetails.length === 0 ? "No class" :
        classDetails.map((cls) => ({
            name: cls.className,
            registered: 
            student?.map((s) => s.stdClassName === item._id).length || 0,
            percentage: classDetails.length,
            
        }));

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 w-[350px] max-h-[370px] ">
            <h3 className="font-semibold text-sm text-gray-700 mb-4">
                Class Progress
            </h3>
            <div className="space-y-4">
                {classData.map((cls, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between bg-[#F7FBFF] px-3 py-2 rounded-xl"
                    >
                        <div>
                            <p className="text-sm font-medium text-gray-800">{cls.name}</p>
                            <p className="text-xs text-gray-500">{cls.registered} Registered</p>
                        </div>
                        <div className="w-12 h-12">
                            <CircularProgressbar
                                value={cls.percentage}
                                text={`${cls.percentage}%`}
                                styles={buildStyles({
                                    textSize: "28px",
                                    pathColor: "#0052b4",
                                    textColor: "#0052b4",
                                    trailColor: "#d6e6ff",
                                })}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClassProgress;
