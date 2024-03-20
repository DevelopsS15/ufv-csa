import { PropsWithChildren } from "react";
import { AppAbbreviationName, AppFullName } from "../config";
import { Metadata } from "next";
import { BulletPoints } from "../components/General/BulletPoints";

export const metadata: Metadata = {
  title: "Regulations",
  description: `The official regulations for the ${AppFullName}`,
};

export default function Page() {
  const xlTitleClass = "text-xl font-semibold";
  return (
    <main className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto py-8 flex flex-col gap-2">
      <div className="text-3xl font-bold">
        {AppAbbreviationName} Regulations
      </div>
      <div className={xlTitleClass}>Preamble</div>
      <div>
        Due to the nature of a student association, there are many cases where a
        quick, small change to the operation of an association is beneficial to
        its members in the short term. Due to the requirements of changing a
        constitution, and the fast changing nature of the computing field, the
        Computing Student Association (hereby “The Association”) presents this
        document to fill the holes left by a fast moving industry, while keeping
        our constitution precise and accurate. This document shall never replace
        any article of The Association&apos;s Constitution, and should only
        exist alongside the existing clauses it provides.
      </div>
      <BulletPoints
        points={[
          <>
            <div className={xlTitleClass}>Named Positions</div>
            <div>
              The following positions are named positions within The Association
              &dash; they do not have to be voted on at a General Meeting
              (although they may be, if the Executive sees fit) and may be
              appointed at an Executive Meeting. These positions may be held by
              members who hold Executive positions, if needed, and need not all
              be filled for a given semester. If a position is not filled, its
              responsibilities become those of The Executive as a whole.
            </div>
            <div>
              The Executive also holds the power to name any officers or
              sub-committees as it deems necessary, which are then responsible
              for carrying out the task(s) they are given.
            </div>
            <BulletPoints
              points={[
                <NamedPositionList key="SCC Manager" title="SCC Manager">
                  The SCC Manager&apos;s job is to monitor the contents and use
                  of all resources available in the Student Computing Center
                  (SCC). Alongside the Executive, the SCC Manager may suggest
                  equipment purchases or replacements within the room.
                  Furthermore, it is the SCC Manager&apos;s responsibility to
                  ensure that the room is kept clean and operational.
                </NamedPositionList>,
                <NamedPositionList key="Webmaster" title="Webmaster">
                  The Webmaster is responsible for the moderation of content
                  appearing on The Association’s website. Time-sensitive matters
                  like Domain renewals and hosting fees should be tracked and
                  brought to the attention of the Executive well ahead of time
                  by the Webmaster.
                </NamedPositionList>,
                <NamedPositionList
                  key="Project Manager"
                  title="Project Manager"
                >
                  The Project Manager is responsible for the delegation of
                  resources within the SCC to members who wish to work with the
                  resources made available. The Project Manager also serves as a
                  single point of contact for any projects the CSA is currently
                  working on, and should have limited knowledge of all resources
                  available.
                </NamedPositionList>,
                <NamedPositionList
                  key="Communications Manager"
                  title="Communications Manager"
                >
                  The Communications Manager is responsible for all relevant
                  social media platforms that the Executive chooses to operate
                  with to represent The Association. This includes the
                  mentioning of upcoming events and meetings, as well as
                  tailoring content to the assumed interests of The
                  Association&apos;s target audience.
                </NamedPositionList>,
                <NamedPositionList
                  key="Alumni Representative"
                  title="Alumni Representative"
                >
                  The Alumni Representative(s) represent active members in the
                  history of The Association, who wish to offer their opinions
                  and experience to the current members. While this named
                  position does not grant voting privileges in meetings (unless
                  specifically requested by The Executive)
                </NamedPositionList>,
                <NamedPositionList
                  key="General Representative"
                  title="General Representative"
                >
                  General Representatives are members who wish to become more
                  active in the association, but are either ineligible for
                  available positions, or unable to commit the effort towards
                  them. General Representatives are expected to attend meetings,
                  to be actively involved in keeping the SCC open when they can,
                  and to participate in events put on by the CSA.
                </NamedPositionList>,
              ]}
            />
          </>,
          <>
            <div className={xlTitleClass}>Planned Absences</div>
            <div>
              In the event that a member of The Executive is expected to be away
              for an extended period of time, (e.g. Co-op) they should step down
              from their position, or find someone willing to hold their
              position in their absence. In the case of the President, the Vice
              President assumes all duties of the President until such a time
              that the President returns.
            </div>
          </>,
          <>
            <div className={xlTitleClass}>Expenditure of Funds</div>
            <BulletPoints
              points={[
                <>
                  Each individual expenditure of funds must be voted on at an
                  executive meeting. Members should either vote on spending a
                  specific amount on an item(s), or up to a specific amount.
                  Once an item is purchased and a receipt is given to the
                  Financial Officer, a cheque covering the cost of the item
                  shall be given to the member who made the purchase for the
                  CSA.
                </>,
                <>
                  An exception to this rule is reoccurring costs, such as the
                  cost of hosting the CSA&apos;s website or the renewal of the
                  CSA&apos;s domain name. These costs are approved with the
                  initial approval, and are subject to repeal by vote at an
                  executive meeting.
                </>,
                <>
                  Except in a case where there are only two members with signing
                  authority, the recipient of funds may not sign for the
                  expenditure of those same funds.
                </>,
              ]}
            />
          </>,
          <>
            <div className={xlTitleClass}>Student Computing Centre</div>
            <BulletPoints
              points={[
                <>
                  The Association has been allocated the Student Computing
                  Centre by UFV Administration and, as such, is subject to
                  restrictions set in place by UFV Administration. UFV
                  Administration carries full authority over how room ABD224
                  will be utilized. The primary purpose for the SCC is to serve
                  as an academic resource for students.
                </>,
                <>
                  Priority for computer and network use in the SCC is given to
                  students who wish to use the resource to complete course work
                  for Computer Information Systems or Computing Science courses
                  they are taking.
                </>,
                <>
                  Computers not owned by UFV should not be hooked up to the UFV
                  network without prior written permission received from ITS
                  management.
                </>,
                <>
                  Administrator passwords will be shared between the current
                  Executives and the SCC Manager. The Administrator password
                  shall be changed if any of the credential-holding positions
                  change persons.
                </>,
                <>
                  The SCC manager shall give an SCC report at all executive
                  meetings to keep members updated on the status of the room and
                  its contents.
                </>,
              ]}
            />
          </>,
          <>
            <div className={xlTitleClass}>CSA Website</div>
            <BulletPoints
              points={[
                <>
                  Modifications to the website shall be done by the Webmaster,
                  utilizing discretion granted by the Executive.
                </>,
                <>
                  The Webmaster shall be responsible for ensuring that the CSA
                  Executive is full apprised of expiration dates and costs for
                  services, such as domain registration and hosting, as well as
                  moderation of content.
                </>,
                <>
                  The CSA Website shall not be used for personal purposes.
                  Sub-domains for any purpose other than official CSA business
                  shall not be permitted.
                </>,
              ]}
            />
          </>,
          <>
            <div className={xlTitleClass}>Modifications to Regulation</div>
            <BulletPoints
              points={[
                <>
                  All modifications to regulation shall be approved by two
                  thirds (rounded up) of the members present at an Executive
                  Meeting.
                </>,
              ]}
            />
          </>,
        ]}
      />
      <div>
        This is the official copy of regulation, effective September 29, 2017.
        All previous copies of CSA Regulation are hereby rescinded.
        Modifications to CSA Regulation require that the date of the last
        modification be used.
      </div>
    </main>
  );
}

interface NamedPositionList extends PropsWithChildren {
  title: string;
}

function NamedPositionList(props: NamedPositionList) {
  return (
    <>
      <div className="text-lg font-semibold">{props.title}</div>
      <div>{props.children}</div>
    </>
  );
}

function HeadingWithBulletPoints({
  title,
  points,
}: {
  title: string;
  points: React.ReactNode[];
}) {
  return (
    <li>
      <div className="text-xl">{title}</div>
      <ol className="list-decimal pl-8">
        {points.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ol>
    </li>
  );
}
