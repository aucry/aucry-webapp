import {alpha, Box, LinearProgress, linearProgressClasses, styled, Typography, useTheme} from "@mui/material";
import {useTranslation} from "react-i18next";
import {AccessAlarm} from "@mui/icons-material";

;

const LinearProgressSuccess = styled(LinearProgress)(
    ({ theme }) => `
        height: 8px;
        border-radius: 0;

        &.${linearProgressClasses.colorPrimary} {
            background-color: ${alpha(theme.colors.success.main, 0.1)};
        }
        
        & .${linearProgressClasses.bar} {
            border-radius: 0;
            animation: gradient 60s infinite;
            background-color: #2f6c12;
              background-image:-webkit-gradient(linear,0 100%,100% 0,color-stop(.25,rgba(0,0,0,.09)),color-stop(.25,transparent),color-stop(.5,transparent),color-stop(.5,rgba(0,0,0,.09)),color-stop(.75,rgba(0,0,0,.09)),color-stop(.75,transparent),to(transparent));
              background-image:-webkit-linear-gradient(45deg,rgba(0,0,0,.09) 2px,transparent 2px,transparent 4px,rgba(0,0,0,.09) 4px,rgba(0,0,0,.09) 6px,transparent 6px,transparent);
              background-image:-moz-linear-gradient(45deg,rgba(0,0,0,.09) 2px,transparent 2px,transparent 4px,rgba(0,0,0,.09) 4px,rgba(0,0,0,.09) 6px,transparent 6px,transparent);
              background-image:-ms-linear-gradient(45deg,rgba(0,0,0,.09) 2px,transparent 2px,transparent 4px,rgba(0,0,0,.09) 4px,rgba(0,0,0,.09) 6px,transparent 6px,transparent);
              background-image:-o-linear-gradient(45deg,rgba(0,0,0,.09) 2px,transparent 2px,transparent 4px,rgba(0,0,0,.09) 4px,rgba(0,0,0,.09) 6px,transparent 6px,transparent);
              background-image:linear-gradient(45deg,rgba(0,0,0,.09) 2px,transparent 2px,transparent 4px,rgba(0,0,0,.09) 4px,rgba(0,0,0,.09) 6px,transparent 6px,transparent);
            -webkit-background-size:6px 6px;-moz-background-size:6px 6px;-ms-background-size:6px 6px;-o-background-size:6px 6px;
              background-size:6px 6px;
        }
    
        @keyframes gradient {
            0% {
                background-position: 0% 50%;
            }
            100% {
                background-position: 100% 50%;
            }
        }`
);

const MiniCountdownClock = ({ auction, props }) => {

    const theme = useTheme();
    let auctionEndTime = parseInt(auction.endTime);
    let currentTimeInSeconds = Date.now() / 1000;
    let startTimeInSeconds = parseInt(auction.config.startTimestamp);
    const {t} = useTranslation();

    function getTimeElapsedPercentage() {
        let letRemainingTimePercent = ((auctionEndTime - currentTimeInSeconds) / (auctionEndTime - startTimeInSeconds)) * 100;
        return 100 - Math.max(0, letRemainingTimePercent);
    }

    function renderTimeRemaining() {
        return renderTimeComponent(props.days,"days ", true, 0, true) +
        renderTimeComponent(props.hours,":", true, 0, true) +
        renderTimeComponent(props.minutes,":", false, 1, true) +
        renderTimeComponent(props.seconds,".", false, 2, true) +
        renderTimeComponent(props.milliseconds,"", false, 3, false);
    }

    function renderTimeComponent(value, suffix, canBeOmitted, minLength, shoutPadStart) {
        if (value < 1 && canBeOmitted) {
            return "";
        } else {
            if (value.toString().length < minLength) {
                return shoutPadStart ? value.toString().padStart(minLength, "0") + suffix
                    : value.toString().padEnd(minLength, "0") + suffix;
            } else {
                return value + suffix;
            }
        }
    }

    return (
        <><LinearProgressSuccess
        variant="determinate"
        value={(getTimeElapsedPercentage())}
        sx={{
            minWidth: 65,
            height: '15px',
            width: '117%',
            marginLeft: '-27px',
            marginRight: '-30px',
            borderRadius: '0px',
            position: "absolute",
            bottom: "0px"
        }}
    />
        <Box sx={{
            minWidth: '100%',
            position: 'absolute',
            color: '#000 !important',
            marginLeft: '-27px'
        }}>
            <Typography variant="body2" sx={{
                textAlign: 'right',
                fontSize: `${theme.typography.pxToRem(11)}`,
                position: "absolute",
                top: "-123px",
                right: "-19px",
                paddingRight: '15px',
                color: '#fff',
                fontFamily: '\'Space Mono\', monospace;'
            }}><AccessAlarm sx={{
                marginTop: "1px",
                display: "block",
                float: "right",
                marginRight: "4px",
                fontSize: "0.88rem",
                marginLeft: "4px",
            }}/>
                {renderTimeRemaining()}
            </Typography>
        </Box>
    </>
    );
}

export default MiniCountdownClock;