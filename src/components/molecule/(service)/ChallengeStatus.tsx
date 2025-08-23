import { cn } from "fast-jsx/util";

interface Props{
	howMuchChallenge:number,
	point:number,
	button: React.ReactNode,
	version?: "v1"|"v2"
}
export default function ChallengeStatus({howMuchChallenge,point,button,version="v1"}:Props){
	const v=version;
	const container={
		display:'flex flex-col gap-y-[10px]',
		width:v==='v1'?'w-full':'w-[345px]',
		height:v==='v1'?'h-[100px]':'h-[95px]',
		radius:v==='v1'?'':'rounded-[10px]',
		padding:v==='v1'?'p-[24px]':'p-[20px]',
		background:'bg-light-main'
	}
	return <div className={cn(container)}>
		<div className="text-[12px] leading-none">{howMuchChallenge}개 챌린지 완료</div>
		<div className="flex justify-between">
			<div className="text-[20px]">{point.toLocaleString()} P</div>
			<div>{button}</div>
		</div>
	</div>
}