import React, {createContext, useState, Dispatch, SetStateAction} from 'react';
import ShelterVisit from "src/screens/ShelterVisit";

type StepIndicatorContextType = {
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

export const StepIndicatorVolunteersContext = createContext<StepIndicatorContextType>({} as StepIndicatorContextType);
export const StepIndicatorAnimalsContext = createContext<StepIndicatorContextType>({} as StepIndicatorContextType);
export const StepIndicatorShelterVisitContext = createContext<StepIndicatorContextType>({} as StepIndicatorContextType);

export const StepIndicatorProvider = ({children}) => {
    const [currentStep1, setCurrentStep1] = useState(0);
    const [currentStep2, setCurrentStep2] = useState(0);
    const [currentStep3, setCurrentStep3] = useState(0);

    return (
        <StepIndicatorVolunteersContext.Provider
            value={{currentStep: currentStep1, setCurrentStep: setCurrentStep1}}>
            <StepIndicatorAnimalsContext.Provider
                value={{currentStep: currentStep2, setCurrentStep: setCurrentStep2}}>
                <StepIndicatorShelterVisitContext.Provider
                    value={{currentStep: currentStep3, setCurrentStep: setCurrentStep3}}>
                    {children}
                </StepIndicatorShelterVisitContext.Provider>
            </StepIndicatorAnimalsContext.Provider>
        </StepIndicatorVolunteersContext.Provider>

    );
};
