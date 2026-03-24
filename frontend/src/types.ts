export interface NewLogin {
    username: string
    password: string
}

export interface User {
    username: string
    token: string
    name?: string
    id: string
}

export type UserAction =
    | { type: 'LOGIN', payload: User}
    | { type: 'LOGOUT' }

export interface UserContextType {
    user: User | null
    userDispatch: React.Dispatch<UserAction>
}

export interface Report {
    fileName: string
    originalName: string
    uploadedAt: Date
    status: 'processing' | 'ready' | 'error'
    user: string | User

    //AI analysis
    summary: string
    companyName: string
    reportYear: number
    healthRating: 'Healthy' | 'Caution' | 'Risky'

    //AI scores for the company to display on frontend
    scores: {
        liquidity: number
        profitability: number
        debt: number
        growth: number
        overallHealth: number
    }

    //Key metrics to display in frontend
    keyMetrics: {
        revenue: string
        revenueGrowth: string
        netIncome: string
        grossMargin: string
        cashPosition: string
        debtToEquity: string
        currentRation: string
        employees: string
    }

    //Strengths and risks.
    keyStrengths: string[]
    keyRisks: string[]
}
