import { Metadata } from "next";
import { AppAbbreviationName, AppFullName } from "../config";
import { cn } from "../utils";

export const metadata: Metadata = {
  title: "Constitution",
  description: `The official constitution for the ${AppFullName}`,
};

export default function Page() {
  return (
    <main className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto py-8 flex flex-col gap-2">
      <div className="text-3xl font-bold">
        {AppAbbreviationName} Constitution
      </div>
      <BulletPoints
        points={[
          <>
            <div className="text-xl font-semibold">Name</div>
            <div>
              There shall be a Computing Student Association (CSA), hereafter
              known as the Association.
            </div>
          </>,
          <>
            <div className="text-xl font-semibold">Purpose</div>
            <BulletPoints
              points={[
                <>To further the cause of Association members within UFV</>,
                <>
                  To promote special and educational activities for Association
                  members, and UFV students in general.
                </>,
                <>
                  To spread information of concern or interest to the members of
                  the Association.
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Membership</div>
            <BulletPoints
              points={[
                <>
                  All students of UFV shall be eligible for membership of the
                  Association so long as they are in good standing with the
                  Association and with UFV SUS.
                </>,
                <>
                  <div>
                    Membership shall be granted to students based on the
                    following:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        A student who has declared a major or minor in either
                        Computer Information Systems or Computer Science shall
                        be granted full membership only.
                      </>,
                      <>
                        A student who is enrolled in any Computer Information
                        Systems or Computer Science program, including diploma
                        programs, degree programs, or certificate courses for a
                        given semester, shall be granted full membership only.
                      </>,
                      <>
                        A student who is enrolled in any Computer Information
                        Systems or Computer Science course, but not granted full
                        membership by Articles 3.2.1 or 3.2.2, shall be granted
                        full membership for the given semester.
                      </>,
                      <>
                        A student who is not granted a membership status by
                        articles 3.2.1, 3.2.2, or 3.2.3 shall be granted
                        associative membership at the student&apos;s request,
                        with the approval of the Executive.
                      </>,
                      <>
                        A member of the UFV Alumni who may or may not be either
                        currently or historically enrolled in any Computer
                        Information Systems or Computer Science program or
                        course shall be granted associative membership at the
                        alumni member&apos;s request.
                      </>,
                    ]}
                  />
                </>,
                <>
                  <div>
                    Membership Types: There are three types of membership within
                    the Association that expand the abilities of a given member
                    to participate.
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        All members of the Association are able to attend
                        meetings and voice their opinion on present matters. In
                        addition, members gain full access to the resources of
                        the Association within the limitations set by the
                        Executive, which are outlined in the Association&apos;s
                        Regulations document.
                      </>,
                      <>
                        A full membership includes the ability to vote in
                        non-executive decisions, as well as the ability to
                        suggest equipment purchases to the Executive to be
                        considered for the use of other Association members.
                        Furthermore, a full member is able to stand for election
                        to any position on the Elective, aside from the Alumni
                        Representative.
                      </>,
                      <>
                        An associative member is able to hold the named position
                        of Alumni Representative, as well as give their opinion
                        on matters about to be voted on in meetings.
                      </>,
                    ]}
                  />
                </>,
                <>
                  <div>Membership Dismissal</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        Members may only be dismissed in the event that they
                        violate the Constitution or Regulation of the
                        Association, abuse association funds, or represent the
                        Association in any way that conflicts with the decisions
                        of the Association Executive. In order to dismiss a
                        member of the Association, 75% of the Executive must be
                        in favour at an executive meeting.
                      </>,
                      <>
                        If a member of the Association graduates, they cease to
                        be a full member of the Association upon receiving their
                        parchments (graduation documents).
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Executive</div>
            <BulletPoints
              points={[
                <>
                  <div>
                    The affairs of the Association shall be managed by an
                    Executive comprised of:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        <div>Signing Executive</div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            "President",
                            "Vice President",
                            "Secretary",
                            "Finance Officer",
                          ]}
                        />
                      </>,
                      <>
                        <div>General Executive</div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            "Active members of the Association",
                            <>
                              An active member of the association is a member
                              who regularly contributes to the Association in
                              some way. For the purpose of voting at executive
                              meetings, any member in good standing who attends
                              the meeting is considered an active member of the
                              Association.
                            </>,
                          ]}
                        />
                      </>,
                    ]}
                  />
                </>,
                <>
                  The Executive shall meet at least twice a month during the
                  fall and winter semesters, the time and place to be determined
                  by the Executive.
                </>,
                <>
                  The Executive shall meet at least once a month during the
                  summer semester, the time and place to be determined by the
                  Executive.
                </>,
                <>
                  A Special Executive meeting may be convened at any time by the
                  President, or by the Vice President in his or her absence.
                </>,
                <>
                  The Executive shall have the power to make Regulation as it
                  deems necessary, provided that Regulation does not conflict
                  with the Constitution. Changes to Regulation must follow the
                  rules set forth within Regulation, except where the changes
                  are brought to a vote at either an annual general meeting, or
                  an extraordinary general meeting, in which case the procedure
                  for constitutional amendments is followed.
                </>,
                <>
                  <div>
                    A member of the Executive shall cease to be a member of the
                    Executive upon any occurrences of the following:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        <div>
                          The member submits, in writing, their resignation to
                          the Secretary.
                        </div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            <>
                              In the absence of the Secretary, or in the case of
                              the Secretary&apos;s resignation, the resignation
                              must be submitted to the President.
                            </>,
                          ]}
                        />
                      </>,
                      <>
                        A member loses full membership status within the
                        Association.
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Duties of the Executive</div>
            <BulletPoints
              points={[
                <>
                  <div>Duties of all Executives shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "Upholding the Constitution and Regulation.",
                      <>
                        Upholding any duties for a named position detailed in a
                        Knowledge Base, stored in a method agreed upon by the
                        Executive.
                      </>,
                    ]}
                  />
                </>,
                <>
                  <div>Duties of Signing Executives shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "Attending all executive meetings.",
                      <>
                        Attending and coordinating the Annual General Meeting,
                        and any Extraordinary General Meeting(s).
                      </>,
                      <>
                        Keeping the membership informed about events and issues
                        presented at Executive Meetings.
                      </>,
                      <>
                        Actively fulfilling the roles of any named positions
                        that are not held by an individual in a given semester,
                        as outlined in Regulation.
                      </>,
                      <>
                        <div>
                          Attending SUS meetings in an official capacity.
                        </div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            <>
                              At least one Signing Executive should attend each
                              SUS meeting where possible, however more than one
                              signing executive or any general executive members
                              are also encouraged to attend.
                            </>,
                          ]}
                        />
                      </>,
                      <>
                        Maintaining the Association&apos;s good reputation with
                        the Abbotsford, Mission, Chilliwack, Agassiz, and Hope
                        communities.
                      </>,
                    ]}
                  />
                </>,
                <>
                  <div>Duties of the President shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        Maintaining the Association&apos;s good reputation
                        through co-operative involvement with UFV&apos;s
                        Administration, the Computer Information Systems
                        Department, faculty, staff, and students.
                      </>,
                      <>
                        Maintaining the Association&apos;s good reputation with
                        the Student Union Society through actively participating
                        in activities and events held by the Student Union
                        Society, as well as sharing concerns and thoughts with
                        SUS&apos;s Professional Studies&apos; Representative.
                      </>,
                      <>
                        Ensuring that all Executive members uphold their duties
                        as described in the Constitution, and take proper
                        action, in accordance to current policy, when Executive
                        members are in default of said duties.
                      </>,
                    ]}
                  />
                </>,
                <>
                  <div>Duties of the Vice-President shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "Assuming all responsibilities of the President in their absence.",
                      "Coordinate and assist in all duties carried out by the President.",
                    ]}
                  />
                </>,
                <>
                  <div>Duties of the Secretary shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        <div>
                          Prepare agendas and minutes for all Association
                          meetings, and distributing them to members as
                          following:
                        </div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            <>
                              Agendas for Executive and General Meetings are to
                              be made available to any member who requests a
                              copy by e-mail.
                            </>,
                            <>
                              Minutes for all meetings are to be made accessible
                              to all members in a form agreed upon by the
                              Executive, as outlined in Regulation.
                            </>,
                          ]}
                        />
                      </>,
                      <>
                        Preparing and posting all required notices for General
                        Meetings, Executive Meetings, and other information for
                        designated bulletin boards.
                      </>,
                      "Issuing and receiving correspondence on behalf of the Association.",
                    ]}
                  />
                </>,
                <>
                  <div>Duties of the Finance Officer shall include:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        <div>
                          Preparing and maintaining all financial records for
                          the Association, and presenting them in a report at
                          each General Meeting.
                        </div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            `Prepare and present a report at each executive meeting detailing all financial records for the Association.`,
                            <>
                              <div>
                                Maintain the bank account of the Association, if
                                such account exists outside of the Student Union
                                Society, as follows:
                              </div>
                              <BulletPoints
                                className="list-disc"
                                points={[
                                  <>
                                    Ensure the President, vice-President,
                                    Secretary and Finance Officer are registered
                                    with the bank as signing officers within two
                                    (2) weeks of the beginning of their elected
                                    term.
                                  </>,
                                  <>
                                    Ensuring that any signer who is no longer
                                    holding a position of The Executive is
                                    unregistered from the bank as a signer.
                                  </>,
                                  <>
                                    Ensure that the bank account requires a
                                    minimum of two (2) signing authorities for
                                    all withdrawals.
                                  </>,
                                  <>
                                    After an Election and two (2) weeks into the
                                    next term, at the latest, the outgoing
                                    Executive must transfer signing authority to
                                    the newly elected Executive. The newly
                                    elected Executive must follow the rules of
                                    this section but cannot exercise spending
                                    authority before the start of their term.
                                  </>,
                                ]}
                              />
                            </>,
                            <>
                              Upon request, assisting the Association in
                              developing draft budget, and tentative plan of
                              expenditures for a given semester.
                            </>,
                            <>
                              Ensuring all withdrawals have been approved by the
                              Executive, and at least two signing officers have
                              endorsed all cheques written and withdrawals made.
                            </>,
                          ]}
                        />
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Finances</div>
            <BulletPoints
              className="pl-8 list-decimal"
              points={[
                <>
                  <div>
                    All funds of the Association must be kept in one of the
                    following:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "The possession of an Executive member.",
                      "A secure lock-box in a central place as agreed to by the Executive.",
                      "The Association's bank account.",
                      "The Association's PayPal account.",
                    ]}
                  />
                </>,
                <>
                  The Financial Officer shall keep proper records for the bank
                  account and PayPal account of the Association and prepare
                  financial statements of the Association&apos;s financial
                  affairs. This shall be done at the direction of the Executive
                  as per sections 5.6.1 and 5.6.2.
                </>,
                <>
                  The Executive shall not use funds from the Association at any
                  given time for a purpose that is not directly related to the
                  needs of the Association.
                </>,
                <>
                  Allocation of funds from the Association bank account must be
                  approved by at least two (2) members of the Executive who are
                  signers on the Association&apos;s bank account. Allocation of
                  funds must be for a reason that is directly related to the
                  needs of the Association or has otherwise been approved by the
                  Executive.
                </>,
                <>
                  The Association recognizes the standard Fiscal Year of the
                  Canadian Federal Government, running from April 1st to March
                  31st.
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">General Meetings</div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  <div>
                    There shall be a General Meeting of the Association each
                    year to:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "Receive a report from the Executive.",
                      <>
                        Receive the audited financial report of the financial
                        affairs of the Association for the previous year, and
                        the budget for the following year.
                      </>,
                      <>
                        <div>
                          Accept nominations from the floor and hold an election
                          to determine the Executive members for the term of
                          October 1 to September 31 of the following year.
                        </div>
                        <BulletPoints
                          className="list-disc"
                          points={[
                            "Executive members may only be nominated after being accredited at least 30 credits by UFV.",
                          ]}
                        />
                      </>,
                    ]}
                  />
                </>,
                <>
                  Each General Meeting must be held after all necessary
                  preparation work is complete and ready to be presented, within
                  the first 30 days of the fall semester beginning.
                </>,
                <>
                  The secretary or Designate shall give fourteen (14) days
                  notice of a General Meeting on the front page of the
                  Association&apos;s website and any relevant social media.
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Special Meetings</div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  <div>
                    The Secretary shall convene a Special Meeting of the
                    Association:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "At the directive of the Executive.",
                      <>
                        Within fourteen (14) days of a petition signed by
                        one-third (1/3) of the total membership or ten (10)
                        members of the association, whichever is the least,
                        provided such a petition shall state the business to be
                        discussed at the Special Meeting.
                      </>,
                    ]}
                  />
                </>,
                <>
                  The secretary shall give seven (7) days notice of a Special
                  Meeting by means of notices placed around the UFV Campus in
                  accordance with section 7.3.
                </>,
                <>
                  The secretary or Designate shall give seven (7) days notice of
                  a Special Meeting on the front page of the Association’s
                  website and any relevant social media.
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Voting</div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  The Chairperson at each meeting of the Association shall be
                  the President, Vice President, Secretary, Financial Officer,
                  or active member of the association based on availability.
                </>,
                <>
                  <div>Persons eligible to vote shall be:</div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      "At Executive Meetings, members of the Executive, both signing and general.",
                      "At General Meetings, those members of the Association present who hold full membership.",
                    ]}
                  />
                </>,
                <>
                  In the event of the tie, the Chairperson of the meeting has
                  the authority to either break the tie, or postpone the vote
                  until the next meeting.
                </>,
                <>
                  All questions before meetings of the Association shall be
                  determined by a simple majority vote of those voting, except
                  where stated otherwise in this Constitution.
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Quorums</div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  The Quorum for an executive Meeting shall be half of all
                  current Executive, rounded up if necessary.
                </>,
                <>
                  The Quorum for General Meetings shall be one-third (1/3) of
                  the total membership, or fifteen (15) members of the
                  Association, whichever is the least, provided that for a
                  Special Meeting called under section 8.1.2 of this
                  Constitution, the quorum shall include at least ninety percent
                  (90%) of the petitioning members.
                </>,
                <>
                  <div>
                    If quorum is not met in a General, Executive, or Special
                    meeting within one half hour (30 minutes) of posted meeting
                    start time, the meeting will be adjourned for one (1) week.
                    If at the rescheduled meeting, quorum is still not met, the
                    meeting and voting may proceed without quorum.
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        Due to the nature of the delay, posters and other
                        notices should be given as soon as possible. The
                        fourteen (14) day requirement does not apply in the case
                        of an adjourned meeting.
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">
              Alterations to the Constitution
            </div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  <div>
                    The procedure for altering this Constitution shall be:
                  </div>
                  <BulletPoints
                    className="list-disc"
                    points={[
                      <>
                        The proposed amendments shall be read out in full before
                        the members attending the General Meeting in which the
                        changes are to be adopted.
                      </>,
                      <>
                        The amendments must be met with a two-thirds (2/3)
                        majority of the voting members present at the General
                        Meeting in order to be adopted.
                      </>,
                      <>
                        The Constitution is the official version of the
                        constitution effective September 18, 2017. All future
                        revisions to the Constitution must modify this section
                        to reflect the date that changes take effect. All
                        previous versions of the constitution are rescinded
                        effective September 18, 2017.
                      </>,
                    ]}
                  />
                </>,
              ]}
            />
          </>,
          <>
            <div className="text-xl font-semibold">Disbandment</div>
            <BulletPoints
              className="list-decimal"
              points={[
                <>
                  Should the Association be disbanded or in any way become
                  defunct, that all assets of the Association shall be held in
                  trust by the Student Union Society of UFV as a ledger entry
                  until such time as the Association is reconstituted and
                  re-affiliated, or for a period of five years. If after this
                  period, the Association in not reconstituted and
                  re-affiliated, the assets will be transferred to the Student
                  Union Society. This clause cannot be altered unless approved
                  by the Student Union Society.
                </>,
              ]}
            />
          </>,
        ]}
      />
    </main>
  );
}

function BulletPoints({
  className,
  points,
}: {
  className?: string;
  points: React.ReactNode[];
}) {
  return (
    <ol className={cn("list-decimal flex flex-col gap-3 pl-6", className)}>
      {points.map((point, index) => (
        <li key={index}>{point}</li>
      ))}
    </ol>
  );
}
