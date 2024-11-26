import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { getHistoryMetadata } from "@/services/blockchain/getHistoryMetadata";

export default async function DetailHistoryPage({
  params,
}: {
  params: Promise<{
    txhash: string;
    unit: string;
  }>;
}) {
  const unit = (await params).unit;
  const txhash = (await params).txhash;
  const cip100Unit = unit.replace("000de140", "000643b0");
  const data = await getHistoryMetadata({
    txHash: txhash,
    unit: cip100Unit,
  });
  return (
    <pre>txhash: {JSON.stringify(data, null, 2)}</pre>
    // <VerticalTimeline>
    //   <VerticalTimelineElement
    //     className="vertical-timeline-element--work shadow-sm"
    //     contentStyle={{ background: "#13161B", color: "#ccc" }}
    //     contentArrowStyle={{ borderRight: "7px solid  #13161B" }}
    //     date="25 Sep, 2024 10:46 - Mint"
    //     iconStyle={{ background: "#13161B", color: "#fff" }}
    //   >
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>

    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //   </VerticalTimelineElement>
    //   <VerticalTimelineElement
    //     className="vertical-timeline-element--work"
    //     contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //     contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
    //     date="2011 - present"
    //     iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //   >
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>

    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //   </VerticalTimelineElement>
    //   <VerticalTimelineElement
    //     className="vertical-timeline-element--work"
    //     contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //     contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
    //     date="2011 - present"
    //     iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //   >
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>

    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //   </VerticalTimelineElement>
    //   <VerticalTimelineElement
    //     className="vertical-timeline-element--work"
    //     contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //     contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
    //     date="2011 - present"
    //     iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //   >
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>

    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //   </VerticalTimelineElement>
    //   <VerticalTimelineElement
    //     className="vertical-timeline-element--work"
    //     contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //     contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
    //     date="2011 - present"
    //     iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
    //   >
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>

    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //     <h3 className="vertical-timeline-element-title">Creative Director</h3>
    //     <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
    //     <p>
    //       Creative Direction, User Experience, Visual Design, Project
    //       Management, Team Leading
    //     </p>
    //   </VerticalTimelineElement>
    // </VerticalTimeline>
  );
}
