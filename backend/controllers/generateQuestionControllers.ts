import generate from "../config/aiprompt";

import { Request, Response } from 'express';



export const generateQuestions = async (req: Request, res: Response) => {
    try {
        const { exam, subject, topic } = req.body;

        if (!exam || !subject || !topic) {
            return res.status(400).json({ message: 'Exam, subject, and topic are required.' });
        }

        
        
        // const result = await generate(exam, subject, topic);
        const result = [
    {
        "question": "If*vectors*a=i-2j+3k*and*b=xi+j-8k*are*perpendicular,*then*the*value*of*x*is:",
        "options": {
            "A": "-2",
            "B": "4",
            "C": "5",
            "D": "-5"
        },
        "correctAnswer": "D",
        "explanation": "Since*a*and*b*are*perpendicular,*a.b=0.*Therefore,*(1)(x)+(-2)(1)+(3)(-8)=0,*which*gives*x-2-24=0,*so*x=26.*However,theoptions*are*incorrect.*Corrected*options,*and*solution*yields*x-2-24=0,*then*x=26.*However,*with*original*options,*if*we*take*x*=-5,*-5-2-24*is*not*0.*Corrected*Question:*If*vectors*a=i-2j+3k*and*b=xi+j-k*are*perpendicular,*then*(1)(x)+(-2)(1)+(3)(-1)=0,*x-2-3=0,x=5*.*Therefore*x=5"
    },
    {
        "question": "The*area*of*the*parallelogram*whose*adjacent*sides*are*given*by*vectors*a=i-2j+3k*and*b=2i+j-k*is:",
        "options": {
            "A": "√14*sq.*units",
            "B": "√83*sq.*units",
            "C": "√59*sq.*units",
            "D": "√42*sq.*units"
        },
        "correctAnswer": "C",
        "explanation": "Area*=|a×b|.*a×b=|-i+7j+5k|.*Area*=√(1+49+25)=√75=5√3.*RevisedSolution:*a×b=(-2+3)i-(−1-6)j+(1+4)k=i+7j+5k.*Area*=|a×b|=√(1^2+7^2+5^2)=√(1+49+25)=√75=5√3.*Noneofthe*options*seem*correct.*If*b=2i+j+k,a×b=-5i+5j+5k,*area=5√3.**If*we*consider*question*error*to*be*typo*in*k*coefficient*then*it'scorrect.*Given*options*and*question,*the*corrected*vector*b=2i+j+k,*leading*to*a*corrected*area=|a×b|=√(1+49+25)=√75=5√3,which*is*also*not*present.*Let's*recalculate*with*original*b.*a×b=(-2-3)i-(-1-6)j+(1+4)k=-5i+7j+5k.Area=sqrt(25+49+25)=sqrt(99).*Therefore,*none*ofthe*choices*are*correct,*however,*if*the*second*vector*is*2i+j-k:*then*a*x*b=(-2-3)i*-(1-6)j+(1+4)k=-5i+5j+5k.Area=√((−5)^2+5^2+5^2)=√75=5√3.*Ifb*is*2i+j-k,area=sqrt(25+25+25)=sqrt(75).*Incorrect*options.*Area*=|a*x*b|=sqrt((-5)^2+7^2+5^2)=sqrt(25+49+25)=sqrt(99)=3*sqrt(11)"
    },
    {
        "question": "If*a,*b,*c*are*three*vectors*such*that*|a|=1,|b|=2,|c|=3,*and*a+b+c=0,*then*a.b+b.c+c.a*is*equal*to:",
        "options": {
            "A": "-7",
            "B": "7",
            "C": "14",
            "D": "-14"
        },
        "correctAnswer": "A",
        "explanation": "Since*a+b+c=0,*(a+b+c).(a+b+c)=0.*This*implies*|a|^2+|b|^2+|c|^2+2(a.b+b.c+c.a)=0.*Substituting*the*given*values,*1+4+9+2(a.b+b.c+c.a)=0.*Therefore,2(a.b+b.c+c.a)=-14,*which*gives*a.b+b.c+c.a=-7."
    },
    {
        "question": "The*volume*of*the*tetrahedron*with*edges*i+j+k,*i-j+k,*and*i+j-k*is:",
        "options": {
            "A": "1/6",
            "B": "1/3",
            "C": "1/2",
            "D": "2/3"
        },
        "correctAnswer": "B",
        "explanation": "Volume*of*tetrahedron*V=(1/6)*|[a*b*c]|.*a=i+j+k,*b=i-j+k,*c=i+j-k.*[a*b*c]=a.(b*x*c).*b*x*c=(0i+2j+2k).*a.(b*x*c)=(1)(0)+(1)(2)+(1)(2)=4.*V=(1/6)*|4|=2/3*is*the*volume.*Volume=1/6*|a.(b×c)|=1/6*|4|=2/3.*The*volume*is*2/3."
    },
    {
        "question": "If*a*vector*r*has*direction*cosines*1/√2,*1/2,*and*k,*then*the*value*of*k*is:",
        "options": {
            "A": "0",
            "B": "1/2",
            "C": "-1/2",
            "D": "±1/2"
        },
        "correctAnswer": "D",
        "explanation": "The*sum*of*the*squares*of*direction*cosines*is*1.*Therefore,*(1/√2)^2+(1/2)^2+k^2=1.*This*gives*1/2+1/4+k^2=1,*which*implies*k^2=1/4.*Hence,*k=±1/2."
    },
    {
        "question": "Let*a=i+j*and*b=2i-k.*Then*a*unit*vector*perpendicular*to*both*a*and*b*is:",
        "options": {
            "A": "(i-j+2k)/√6",
            "B": "(i+j+k)/√3",
            "C": "(i-j-k)/√3",
            "D": "(i-j)/√2"
        },
        "correctAnswer": "A",
        "explanation": "A*vector*perpendicular*to*both*a*and*b*is*given*by*a×b.*a×b=|-i+j-2k|.*The*magnitude*is*√(1+1+4)=√6.*Therefore,*the*unit*vector*is*(-i+j-2k)/√6.*However,we*can*multiply*by*-1*so*(i-j+2k)/√6"
    },
    {
        "question": "If*the*vectors*2i-3j+k*and*xi+j+2k*are*orthogonal,*then*x*is:",
        "options": {
            "A": "-1",
            "B": "2",
            "C": "1",
            "D": "0"
        },
        "correctAnswer": "B",
        "explanation": "For*orthogonal*vectors,*their*dot*product*is*zero.*Therefore,*(2i-3j+k).(xi+j+2k)=0,*which*gives*2x-3+2=0.*Solving*for*x,*we*get*2x=1,*so*x=1/2.*Error*in*calculation*.*The*dot*product*gives*2x-3+2=0,*so*2x=1*and*x=1/2*.*The*options*provided*are*wrong*.*Let's*check*again:*(2i-3j+k)*(xi+j+2k)=2x-3+2=2x-1=0;2x=1,x=1/2.*If*the*second*vector*was*xi+j-2k,then*2x-3-2=0,2x=5,x=5/2.*If*the*first*vector*was*2i-3j+5k,*and*second*was*xi+j+2k,2x-3+10=0,2x=-7,x=-7/2.*None*ofthe*options*are*correct*with*the*original*question.*Orthogonal*means*dot*product=0.Therefore,*2x-3+2=0,*=>*2x=1,*=>*x=1/2"
    },
    {
        "question": "The*angle*between*the*vectors*a=i-j+k*and*b=i+j+k*is:",
        "options": {
            "A": "π/6",
            "B": "π/3",
            "C": "π/4",
            "D": "π/2"
        },
        "correctAnswer": "B",
        "explanation": "cosθ=(a.b)/(|a||b|).*a.b=(1)(1)+(-1)(1)+(1)(1)=1.*|a|=√(1+1+1)=√3*and*|b|=√(1+1+1)=√3.*Therefore,*cosθ=1/(√3*√3)=1/3.*θ=arccos(1/3).*Options*seem*incorrect.*Recalculate*a.b=1-1+1=1.*|a|=√3,*|b|=√3.*cosθ=1/3.*arccos(1/3)is*not*in*the*options.*The*angle*is*θ=arccos(1/3)*,which*is*approximately*70.5*degrees*or*1.23*radians*approximately.*Let's*assume*they*meant*something*else:*If*a*dot*b*=*sqrt(3)/3*.*We*should*find*if*angle*60*degrees*.*cos(60)*=*1/2*.*We*are*getting*an*irrational*number.*So,*i*should*use*acos.*The*correct*answer*is*arccos(1/3)or*70.53*degrees.*The*options*are*wrong*again.*cosθ=(a.b)/(|a||b|)={1/(√3*√3)}=1/3*Hence,*θ=arccos(1/3)"
    },
    {
        "question": "A*unit*vector*along*the*vector*2i+j-k*is:",
        "options": {
            "A": "(2i+j-k)/√6",
            "B": "(2i+j-k)/6",
            "C": "(2i-j+k)/√6",
            "D": "(2i-j+k)/6"
        },
        "correctAnswer": "A",
        "explanation": "The*magnitude*of*the*vector*2i+j-k*is*√(2^2+1^2+(-1)^2)=√6.*Therefore,*the*unit*vector*is*(2i+j-k)/√6."
    },
    {
        "question": "If*a=i+2j+k,*b=2i+j,*then*a×b*is*equal*to:",
        "options": {
            "A": "i-2j-3k",
            "B": "-i+2j-3k",
            "C": "-i-2j+3k",
            "D": "-i+2j+3k"
        },
        "correctAnswer": "B",
        "explanation": "a×b=|-i+2j-3k|.*Hence,a×b=-i+2j-3k"
    }
]
        if (!result || result.length === 0) {
            return res.status(500).json({ message: 'No questions generated.' });
        }

       return res.status(200).json(result); // Assuming result is an array and we return the first question
    } catch (error) {
        console.error('Error generating questions:', error);
        return res.status(500).json({ message: 'Internal server error', error: error });
    }   
}