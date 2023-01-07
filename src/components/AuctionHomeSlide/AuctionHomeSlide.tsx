import {Card, CardContent} from "@mui/material";
import {usePrismicDocumentByID} from "@prismicio/react";

const AuctionHomeSlide = ({slice}) => {

    const [document] = usePrismicDocumentByID(slice.primary.slide.id);
    if (document !== undefined) {
        return (<Card
            sx={{
                px: 1,
                m: 3,
                height: "275px",
                backgroundImage: "url(" + document.data.image.url + ");",
                backgroundSize: "cover"
            }}
        >
            <CardContent>
                test
            </CardContent>
        </Card>);
    } else {
        return (
            <>
                Loading...
            </>
        )
    }
}

export default AuctionHomeSlide;