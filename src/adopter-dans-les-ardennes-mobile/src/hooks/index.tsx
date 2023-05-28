import {ReactNode} from 'react';
import {AuthProvider} from 'src/hooks/Auth/auth';
import {StepIndicatorProvider} from "src/hooks/stepIndicator";

interface AppProviderProps {
    children: ReactNode;
}

const AppProvider = ({children}: AppProviderProps) => {
    return (
        <AuthProvider>
            <StepIndicatorProvider>
                {children}
            </StepIndicatorProvider>
        </AuthProvider>
    );
};

export default AppProvider;
