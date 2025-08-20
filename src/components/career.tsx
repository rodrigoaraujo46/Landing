import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import SearchIcon from '@mui/icons-material/SearchRounded';
import Icons from './icons';

export default function CustomizedTimeline() {
    return (
        <>
            <h1 className="text-5xl font-roboto font-bold mb-9">Career</h1>
            <Timeline>
                <TimelineItem>
                    <TimelineOppositeContent sx={{ m: 'auto' }} >
                        2024
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot className='h-[36px] w-[36px]'>
                            <Icons.UTAD />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                        <strong>Bachelor of Informatics Engineering</strong>
                        <p className='mt-1'>Universidade de Trás-os-Montes e Alto Douro</p>
                    </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                    <TimelineOppositeContent sx={{ m: 'auto' }} >
                        Currently
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot className='bg-gopher' color="inherit">
                            <SearchIcon />
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ m: 'auto' }}>
                        <strong>Looking for my first job...</strong>
                    </TimelineContent>
                </TimelineItem>
            </Timeline>
        </>
    );
}
