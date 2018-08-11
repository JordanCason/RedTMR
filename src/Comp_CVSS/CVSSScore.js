// react
import React, {Component} from 'react'
// import { Redirect, withRouter } from "react-router-dom"
import {connect} from 'react-redux'
// import { NavLink } from 'react-router-dom'

// ethereum
// import {myContract, web3, bountyabi} from '../Comp_web3/abi.js'

// other
import 'purecss'
import styled from 'styled-components'
// import {CVSS} from './cvsscalc30.js'

// actions
import {bountysListAction} from '../redux_actions/action_bountysList'
import {bountyCurrentAction, checkOwnerAction} from '../redux_actions/action_bountyCurrent'
import {depositEthAction, withdrawEthAction} from '../redux_actions/action_contractTransactions'
import {walletAddressAction} from '../redux_actions/action_walletAddress'
import {addCVSSMetricAction, calculateCVSSAction} from '../redux_actions/action_calculateCVSS.js'

class CVSSScore extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(evt) {
        this.props.addCVSSMetricAction(this.props.CVSSData.metrics, evt.target.name, evt.target.value).then((result) => {
            if (result.value.readyState) {
                this.props.calculateCVSSAction(this.props.CVSSData.metrics)
            }
        })
    }
    render = () => {
        const {base, environmental, temporal, metrics} = this.props.CVSSData
        return (<CVSSStyle>
            <div>
                <form action="#">
                    <p id="cvssReference"></p>
                    <fieldset id="baseMetricGroup">
                        <legend id="baseMetricGroup_Legend" title="The Base Metric group represents the intrinsic  characteristics of a vulnerability that are constant over time and across user environments. Determine the vulnerable component and score Attack Vector, Attack Complexity, Privileges Required and User Interaction relative to this.">Base Score</legend>
                        <div className="column column-left">
                            <div className="metric">
                                <h3 id="AV_Heading" title="This metric reflects the context by which vulnerability exploitation is possible.
                                        The Base Score increases the more remote (logically, and physically) an attacker can be in order to exploit
                                        the vulnerable component.">Attack Vector (AV)</h3>
                                <input name="AV" id="AV_N" defaultValue="N" defaultChecked={metrics['AV'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AV_N" id="AV_N_Label" title="A vulnerability exploitable with network access means the vulnerable
                              component is bound to the network stack and the attacker's path is through OSI layer 3 (the network layer).
                              Such a vulnerability is often termed &quot;remotely exploitable” and can be thought of as an attack being
                              exploitable one or more network hops away.">Network (N)</label>
                                <input name="AV" id="AV_A" defaultValue="A" defaultChecked={metrics['AV'] === 'A'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AV_A" id="AV_A_Label" title="A vulnerability exploitable with adjacent network access means
                              the vulnerable component is bound to the network stack, however the attack is limited to the same shared
                              physical (e.g. Bluetooth, IEEE 802.11), or logical (e.g. local IP subnet) network, and cannot be performed
                              across an OSI layer 3 boundary (e.g. a router).">Adjacent (A)</label>
                                <input name="AV" id="AV_L" defaultValue="L" defaultChecked={metrics['AV'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AV_L" id="AV_L_Label" title="A vulnerability exploitable with local access means that the
                              vulnerable component is not bound to the network stack, and the attacker’s path is via read/write/execute
                              capabilities. In some cases, the attacker may be logged in locally in order to exploit the vulnerability,
                              otherwise, she may rely on User Interaction to execute a malicious file.">Local (L)</label>
                                <input name="AV" id="AV_P" defaultValue="P" defaultChecked={metrics['AV'] === 'P'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AV_P" id="AV_P_Label" title="A vulnerability exploitable with physical access requires
                              the attacker to physically touch or manipulate the vulnerable component. Physical interaction may
                              be brief or persistent.">Physical (P)</label>
                            </div>
                            <div className="metric">
                                <h3 id="AC_Heading" title="This metric describes the conditions beyond the attacker’s control that must
                              exist in order to exploit the vulnerability. Such conditions may require the collection of more information
                              about the target, the presence of certain system configuration settings, or computational exceptions.">Attack Complexity (AC)</h3>
                                <input name="AC" defaultValue="L" id="AC_L" defaultChecked={metrics['AC'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AC_L" id="AC_L_Label" title="Specialized access conditions or extenuating circumstances do
                              not exist. An attacker can expect repeatable success against the vulnerable component.">Low (L)</label>
                                <input name="AC" defaultValue="H" id="AC_H" defaultChecked={metrics['AC'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AC_H" id="AC_H_Label" title="A successful attack depends on conditions beyond the attacker's
                              control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest
                               in some measurable amount of effort in preparation or execution against the vulnerable component before
                               a successful attack can be expected. For example, a successful attack may require the attacker: to perform
                               target-specific reconnaissance; to prepare the target environment to improve exploit reliability; or to
                               inject herself into the logical network path between the target and the resource requested by the victim
                               in order to read and/or modify network communications (e.g. a man in the middle attack).">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="PR_Heading" title="This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. This Base Score increases as fewer privileges are required.">Privileges Required (PR)</h3>
                                <input name="PR" defaultValue="N" id="PR_N" defaultChecked={metrics['PR'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="PR_N" id="PR_N_Label" title="The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files to carry out an attack.">None (N)</label>
                                <input name="PR" defaultValue="L" id="PR_L" defaultChecked={metrics['PR'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="PR_L" id="PR_L_Label" title="The attacker is authorized with (i.e. requires) privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges may have the ability to cause an impact only to non-sensitive resources.">Low (L)</label>
                                <input name="PR" defaultValue="H" id="PR_H" defaultChecked={metrics['PR'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="PR_H" id="PR_H_Label" title="The attacker is authorized with (i.e. requires) privileges that provide significant (e.g. administrative) control over the vulnerable component that could affect component-wide settings and files.">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="UI_Heading" title="This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise the vulnerable component. This metric determines whether the vulnerability can be exploited solely at the will of the attacker, or whether a separate user (or user-initiated process) must participate in some manner. The Base Score is highest when no user interaction is required.">User Interaction (UI)</h3>
                                <input name="UI" defaultValue="N" id="UI_N" defaultChecked={metrics['UI'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="UI_N" id="UI_N_Label" title="The vulnerable system can be exploited without any interaction from any user.">None (N)</label>
                                <input name="UI" defaultValue="R" id="UI_R" defaultChecked={metrics['UI'] === 'R'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="UI_R" id="UI_R_Label" title="Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited.">Required (R)</label>
                            </div>
                        </div>
                        <div className="column column-right">
                            <div className="metric">
                                <h3 id="S_Heading" title="Does a successful attack impact a component other than the vulnerable component? If so, the Base Score increases and the Confidentiality, Integrity and Authentication metrics should be scored relative to the impacted component.">Scope (S)</h3>
                                <input name="S" defaultValue="U" id="S_U" defaultChecked={metrics['S'] === 'U'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="S_U" id="S_U_Label" title="An exploited vulnerability can only affect resources managed by the same authority. In this case the vulnerable component and the impacted component are the same.">Unchanged (U)</label>
                                <input name="S" defaultValue="C" id="S_C" defaultChecked={metrics['S'] === 'C'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="S_C" id="S_C_Label" title="An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable component. In this case the vulnerable component and the impacted component are different.">Changed (C)</label>
                            </div>
                            <div className="metric">
                                <h3 id="C_Heading" title="This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones.">Confidentiality (C)</h3>
                                <input name="C" defaultValue="N" id="C_N" defaultChecked={metrics['C'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="C_N" id="C_N_Label" title="There is no loss of confidentiality within the impacted component.">None (N)</label>
                                <input name="C" defaultValue="L" id="C_L" defaultChecked={metrics['C'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="C_L" id="C_L_Label" title="There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is constrained. The information disclosure does not cause a direct, serious loss to the impacted component.">Low (L)</label>
                                <input name="C" defaultValue="H" id="C_H" defaultChecked={metrics['C'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="C_H" id="C_H_Label" title="There is total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="I_Heading" title="This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and veracity of information.">Integrity (I)</h3>
                                <input name="I" defaultValue="N" id="I_N" defaultChecked={metrics['I'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="I_N" id="I_N_Label" title="There is no loss of integrity within the impacted component.">None (N)</label>
                                <input name="I" defaultValue="L" id="I_L" defaultChecked={metrics['I'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="I_L" id="I_L_Label" title="Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is constrained. The data modification does not have a direct, serious impact on the impacted component.">Low (L)</label>
                                <input name="I" defaultValue="H" id="I_H" defaultChecked={metrics['I'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="I_H" id="I_H_Label" title="There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="A_Heading" title="This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. It refers to the loss of availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component.">Availability (A)</h3>
                                <input name="A" defaultValue="N" id="A_N" defaultChecked={metrics['A'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="A_N" id="A_N_Label" title="There is no impact to availability within the impacted component.">None (N)</label>
                                <input name="A" defaultValue="L" id="A_L" defaultChecked={metrics['A'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="A_L" id="A_L_Label" title="There is reduced performance or interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.">Low (L)</label>
                                <input name="A" defaultValue="H" id="A_H" defaultChecked={metrics['A'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="A_H" id="A_H_Label" title="There is total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).">High (H)</label>
                            </div>
                        </div>
                        <div className={`scoreRating ${base.severity}`}>
                            <p className="needBaseMetrics"></p>
                            <span id="baseMetricScore">{base.score}</span>
                            <span id="baseSeverity">{base.severity}</span>
                        </div>
                    </fieldset>
                    <div className="end"/>

                    <fieldset id="temporalMetricGroup">
                        <legend id="temporalMetricGroup_Legend" title="The Temporal metrics measure the current state of exploit techniques or code availability, the existence of any patches or workarounds, or the confidence that one has in the description of a vulnerability.">Temporal Score</legend>
                        <div className="column column-left">
                            <div className="metric">
                                <h3 id="E_Heading" title="This metric measures the likelihood of the vulnerability being attacked, and is typically based on the current state of exploit techniques, exploit code availability, or active, 'in-the-wild' exploitation.">Exploit Code Maturity (E)</h3>
                                <input name="E" defaultValue="X" id="E_X" defaultChecked={metrics['E'] === 'X'} type="radio"/>
                                <label htmlFor="E_X" id="E_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="E" defaultValue="U" id="E_U" defaultChecked={metrics['E'] === 'U'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="E_U" id="E_U_Label" title="No exploit code is available, or an exploit is theoretical.">Unproven (U)</label>
                                <input name="E" defaultValue="P" id="E_P" defaultChecked={metrics['E'] === 'P'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="E_P" id="E_P_Label" title="Proof-of-concept exploit code is available, or an attack demonstration is not practical for most systems. The code or technique is not functional in all situations and may require substantial modification by a skilled attacker.">Proof-of-Concept (P)</label>
                                <input name="E" defaultValue="F" id="E_F" defaultChecked={metrics['E'] === 'F'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="E_F" id="E_F_Label" title="Functional exploit code is available. The code works in most situations where the vulnerability exists.">Functional (F)</label>
                                <input name="E" defaultValue="H" id="E_H" defaultChecked={metrics['E'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="E_H" id="E_H_Label" title="Functional autonomous code exists, or no exploit is required (manual trigger) and details are widely available. Exploit code works in every situation, or is actively being delivered via an autonomous agent (such as a worm or virus). Network-connected systems are likely to encounter scanning or exploitation attempts. Exploit development has reached the level of reliable, widely-available, easy-to-use automated tools.">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="RL_Heading" title="The Remediation Level of a vulnerability is an important factor for prioritization. The typical vulnerability is unpatched when initially published. Workarounds or hotfixes may offer interim remediation until an official patch or upgrade is issued. Each of these respective stages adjusts the temporal score downwards, reflecting the decreasing urgency as remediation becomes final.">Remediation Level (RL)</h3>
                                <input name="RL" defaultValue="X" id="RL_X" defaultChecked={metrics['RL'] === 'X'} type="radio"/>
                                <label htmlFor="RL_X" id="RL_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="RL" defaultValue="O" id="RL_O" defaultChecked={metrics['RL'] === 'O'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RL_O" id="RL_O_Label" title="A complete vendor solution is available. Either the vendor has issued an official patch, or an upgrade is available.">Official Fix (O)</label>
                                <input name="RL" defaultValue="T" id="RL_T" defaultChecked={metrics['RL'] === 'T'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RL_T" id="RL_T_Label" title="There is an official but temporary fix available. This includes instances where the vendor issues a temporary hotfix, tool, or workaround.">Temporary Fix (T)</label>
                                <input name="RL" defaultValue="W" id="RL_W" defaultChecked={metrics['RL'] === 'W'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RL_W" id="RL_W_Label" title="There is an unofficial, non-vendor solution available. In some cases, users of the affected technology will create a patch of their own or provide steps to work around or otherwise mitigate the vulnerability.">Workaround (W)</label>
                                <input name="RL" defaultValue="U" id="RL_U" defaultChecked={metrics['RL'] === 'U'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RL_U" id="RL_U_Label" title="There is either no solution available or it is impossible to apply.">Unavailable (U)</label>
                            </div>
                            <div className="metric">
                                <h3 id="RC_Heading" title="This metric measures the degree of confidence in the existence of the vulnerability and the credibility of the known technical details. Sometimes only the existence of vulnerabilities are publicized, but without specific details. For example, an impact may be recognized as undesirable, but the root cause may not be known. The vulnerability may later be corroborated by research which suggests where the vulnerability may lie, though the research may not be certain. Finally, a vulnerability may be confirmed through acknowledgement by the author or vendor of the affected technology. The urgency of a vulnerability is higher when a vulnerability is known to exist with certainty. This metric also suggests the level of technical knowledge available to would-be attackers.">Report Confidence (RC)</h3>
                                <input name="RC" defaultValue="X" id="RC_X" defaultChecked={metrics['RC'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RC_X" id="RC_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="RC" defaultValue="U" id="RC_U" defaultChecked={metrics['RC'] === 'U'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RC_U" id="RC_U_Label" title="There are reports of impacts that indicate a vulnerability is present. The reports indicate that the cause of the vulnerability is unknown, or reports may differ on the cause or impacts of the vulnerability. Reporters are uncertain of the true nature of the vulnerability, and there is little confidence in the validity of the reports or whether a static Base score can be applied given the differences described. An example is a bug report which notes that an intermittent but non-reproducible crash occurs, with evidence of memory corruption suggesting that denial of service, or possible more serious impacts, may result.">Unknown (U)</label>
                                <input name="RC" defaultValue="R" id="RC_R" defaultChecked={metrics['RC'] === 'R'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RC_R" id="RC_R_Label" title="Significant details are published, but researchers either do not have full confidence in the root cause, or do not have access to source code to fully confirm all of the interactions that may lead to the result. Reasonable confidence exists, however, that the bug is reproducible and at least one impact is able to be verified (Proof-of-concept exploits may provide this). An example is a detailed write-up of research into a vulnerability with an explanation (possibly obfuscated or 'left as an exercise to the reader') that gives assurances on how to reproduce the results.">Reasonable (R)</label>
                                <input name="RC" defaultValue="C" id="RC_C" defaultChecked={metrics['RC'] === 'C'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="RC_C" id="RC_C_Label" title="Detailed reports exist, or functional reproduction is possible (functional exploits may provide this). Source code is available to independently verify the assertions of the research, or the author or vendor of the affected code has confirmed the presence of the vulnerability.">Confirmed (C)</label>
                            </div>
                        </div>
                        <div className={`scoreRating ${temporal.severity}`}>
                            <p className="needBaseMetrics"></p>
                            <span id="temporalMetricScore">{temporal.score}</span>
                            <span id="temporalSeverity">{temporal.severity}</span>
                        </div>
                    </fieldset>
                    <div className="end"/>
                    <fieldset id="environmentalMetricGroup">
                        <legend id="environmentalMetricGroup_Legend" title="These metrics enable the analyst to customize the CVSS score depending on the importance of the affected IT asset to a user’s organization, measured in terms of complementary/alternative security controls in place, Confidentiality, Integrity, and Availability. The metrics are the modified equivalent of base metrics and are assigned metric values based on the component placement in organization infrastructure.">Environmental Score</legend>
                        <div className="column column-left">
                            <div className="metric">
                                <h3 id="CR_Heading" title="These metrics enable the analyst to customize the CVSS score depending on the importance of the Confidentiality of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Confidentiality impact metric versus the other modified impacts.">Confidentiality Requirement (CR)</h3>
                                <input name="CR" defaultValue="X" id="CR_X" defaultChecked={metrics['CR'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="CR_X" id="CR_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="CR" defaultValue="L" id="CR_L" defaultChecked={metrics['CR'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="CR_L" id="CR_L_Label" title="Loss of Confidentiality is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">Low (L)</label>
                                <input name="CR" defaultValue="M" id="CR_M" defaultChecked={metrics['CR'] === 'M'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="CR_M" id="CR_M_Label" title="Assigning this value to the metric will not influence the score.">Medium (M)</label>
                                <input name="CR" defaultValue="H" id="CR_H" defaultChecked={metrics['CR'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="CR_H" id="CR_H_Label" title="Loss of Confidentiality is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="IR_Heading" title="These metrics enable the analyst to customize the CVSS score depending on the importance of the Integrity of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Integrity impact metric versus the other modified impacts.">Integrity Requirement (IR)</h3>
                                <input name="IR" defaultValue="X" id="IR_X" defaultChecked={metrics['IR'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="IR_X" id="IR_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="IR" defaultValue="L" id="IR_L" defaultChecked={metrics['IR'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="IR_L" id="IR_L_Label" title="Loss of Integrity is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">Low (L)</label>
                                <input name="IR" defaultValue="M" id="IR_M" defaultChecked={metrics['IR'] === 'M'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="IR_M" id="IR_M_Label" title="Assigning this value to the metric will not influence the score.">Medium (M)</label>
                                <input name="IR" defaultValue="H" id="IR_H" defaultChecked={metrics['IR'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="IR_H" id="IR_H_Label" title="Loss of Integrity is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">High (H)</label>
                            </div>
                            <div className="metric">
                                <h3 id="AR_Heading" title="These metrics enable the analyst to customize the CVSS score depending on the importance of the Availability of the affected IT asset to a user’s organization, relative to other impacts. This metric modifies the environmental score by reweighting the Modified Availability impact metric versus the other modified impacts.">Availability Requirement (AR)</h3>
                                <input name="AR" defaultValue="X" id="AR_X" defaultChecked={metrics['AR'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AR_X" id="AR_X_Label" title="Assigning this value to the metric will not influence the score.">Not Defined (X)</label>
                                <input name="AR" defaultValue="L" id="AR_L" defaultChecked={metrics['AR'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AR_L" id="AR_L_Label" title="Loss of Availability is likely to have only a limited adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">Low (L)</label>
                                <input name="AR" defaultValue="M" id="AR_M" defaultChecked={metrics['AR'] === 'M'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AR_M" id="AR_M_Label" title="Assigning this value to the metric will not influence the score.">Medium (M)</label>
                                <input name="AR" defaultValue="H" id="AR_H" defaultChecked={metrics['AR'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="AR_H" id="AR_H_Label" title="Loss of Availability is likely to have a catastrophic adverse effect on the organization or individuals associated with the organization (e.g., employees, customers).">High (H)</label>
                            </div>
                        </div>
                        <div className="column column-right">
                            <div className="metric">
                                <h3 id="MAV_Heading" title="This metric reflects the context by which vulnerability exploitation is possible. The Base Score increases the more remote (logically, and physically) an attacker can be in order to exploit the vulnerable component.">Modified Attack Vector (MAV)</h3>
                                <input name="MAV" defaultValue="X" id="MAV_X" defaultChecked={metrics['MAV'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAV_X" id="MAV_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MAV" defaultValue="N" id="MAV_N" defaultChecked={metrics['MAV'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAV_N" id="MAV_N_Label" title="A vulnerability exploitable with network access means the vulnerable component is bound to the network stack and the attacker's path is through OSI layer 3 (the network layer). Such a vulnerability is often termed &quot;remotely exploitable” and can be thought of as an attack being exploitable one or more network hops away.">Network</label>
                                <input name="MAV" defaultValue="A" id="MAV_A" defaultChecked={metrics['MAV'] === 'A'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAV_A" id="MAV_A_Label" title="A vulnerability exploitable with adjacent network access means the vulnerable component is bound to the network stack, however the attack is limited to the same shared physical (e.g. Bluetooth, IEEE 802.11), or logical (e.g. local IP subnet) network, and cannot be performed across an OSI layer 3 boundary (e.g. a router).">Adjacent Network</label>
                                <input name="MAV" defaultValue="L" id="MAV_L" defaultChecked={metrics['MAV'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAV_L" id="MAV_L_Label" title="A vulnerability exploitable with local access means that the vulnerable component is not bound to the network stack, and the attacker’s path is via read/write/execute capabilities. In some cases, the attacker may be logged in locally in order to exploit the vulnerability, otherwise, she may rely on User Interaction to execute a malicious file.">Local</label>
                                <input name="MAV" defaultValue="P" id="MAV_P" defaultChecked={metrics['MAV'] === 'P'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAV_P" id="MAV_P_Label" title="A vulnerability exploitable with physical access requires the attacker to physically touch or manipulate the vulnerable component. Physical interaction may be brief or persistent.">Physical</label>
                            </div>
                            <div className="metric">
                                <h3 id="MAC_Heading" title="This metric describes the conditions beyond the attacker’s control that must exist in order to exploit the vulnerability. Such conditions may require the collection of more information about the target, the presence of certain system configuration settings, or computational exceptions.">Modified Attack Complexity (MAC)</h3>
                                <input name="MAC" defaultValue="X" id="MAC_X" defaultChecked={metrics['MAC'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAC_X" id="MAC_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MAC" defaultValue="L" id="MAC_L" defaultChecked={metrics['MAC'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAC_L" id="MAC_L_Label" title="Specialized access conditions or extenuating circumstances do not exist. An attacker can expect repeatable success against the vulnerable component.">Low</label>
                                <input name="MAC" defaultValue="H" id="MAC_H" defaultChecked={metrics['MAC'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MAC_H" id="MAC_H_Label" title="A successful attack depends on conditions beyond the attacker's control. That is, a successful attack cannot be accomplished at will, but requires the attacker to invest in some measurable amount of effort in preparation or execution against the vulnerable component before a successful attack can be expected. For example, a successful attack may require the attacker: to perform target-specific reconnaissance; to prepare the target environment to improve exploit reliability; or to inject herself into the logical network path between the target and the resource requested by the victim in order to read and/or modify network communications (e.g. a man in the middle attack).">High</label>
                            </div>
                            <div className="metric">
                                <h3 id="MPR_Heading" title="This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability. This Base Score increases as fewer privileges are required.">Modified Privileges Required (MPR)</h3>
                                <input name="MPR" defaultValue="X" id="MPR_X" defaultChecked={metrics['MPR'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MPR_X" id="MPR_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MPR" defaultValue="N" id="MPR_N" defaultChecked={metrics['MPR'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MPR_N" id="MPR_N_Label" title="The attacker is unauthorized prior to attack, and therefore does not require any access to settings or files to carry out an attack.">None</label>
                                <input name="MPR" defaultValue="L" id="MPR_L" defaultChecked={metrics['MPR'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MPR_L" id="MPR_L_Label" title="The attacker is authorized with (i.e. requires) privileges that provide basic user capabilities that could normally affect only settings and files owned by a user. Alternatively, an attacker with Low privileges may have the ability to cause an impact only to non-sensitive resources.">Low</label>
                                <input name="MPR" defaultValue="H" id="MPR_H" defaultChecked={metrics['MPR'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MPR_H" id="MPR_H_Label" title="The attacker is authorized with (i.e. requires) privileges that provide significant (e.g. administrative) control over the vulnerable component that could affect component-wide settings and files.">High</label>
                            </div>
                            <div className="metric">
                                <h3 id="MUI_Heading" title="This metric captures the requirement for a user, other than the attacker, to participate in the successful compromise the vulnerable component. This metric determines whether the vulnerability can be exploited solely at the will of the attacker, or whether a separate user (or user-initiated process) must participate in some manner. The Base Score is highest when no user interaction is required.">Modified User Interaction (MUI)</h3>
                                <input name="MUI" defaultValue="X" id="MUI_X" defaultChecked={metrics['MUI'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MUI_X" id="MUI_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MUI" defaultValue="N" id="MUI_N" defaultChecked={metrics['MUI'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MUI_N" id="MUI_N_Label" title="The vulnerable system can be exploited without any interaction from any user.">None</label>
                                <input name="MUI" defaultValue="R" id="MUI_R" defaultChecked={metrics['MUI'] === 'R'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MUI_R" id="MUI_R_Label" title="Successful exploitation of this vulnerability requires a user to take some action before the vulnerability can be exploited.">Required</label>
                            </div>
                            <div className="metric">
                                <h3 id="MS_Heading" title="Does a successful attack impact a component other than the vulnerable component? If so, the Base Score increases and the Confidentiality, Integrity and Authentication metrics should be scored relative to the impacted component.">Modified Scope (MS)</h3>
                                <input name="MS" defaultValue="X" id="MS_X" defaultChecked={metrics['MS'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MS_X" id="MS_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MS" defaultValue="U" id="MS_U" defaultChecked={metrics['MS'] === 'U'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MS_U" id="MS_U_Label" title="An exploited vulnerability can only affect resources managed by the same authority. In this case the vulnerable component and the impacted component are the same.">Unchanged</label>
                                <input name="MS" defaultValue="C" id="MS_C" defaultChecked={metrics['MS'] === 'C'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MS_C" id="MS_C_Label" title="An exploited vulnerability can affect resources beyond the authorization privileges intended by the vulnerable component. In this case the vulnerable component and the impacted component are different.">Changed</label>
                            </div>
                            <div className="metric">
                                <h3 id="MC_Heading" title="This metric measures the impact to the confidentiality of the information resources managed by a software component due to a successfully exploited vulnerability. Confidentiality refers to limiting information access and disclosure to only authorized users, as well as preventing access by, or disclosure to, unauthorized ones.">Modified Confidentiality (MC)</h3>
                                <input name="MC" defaultValue="X" id="MC_X" defaultChecked={metrics['MC'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MC_X" id="MC_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MC" defaultValue="N" id="MC_N" defaultChecked={metrics['MC'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MC_N" id="MC_N_Label" title="There is no loss of confidentiality within the impacted component.">None</label>
                                <input name="MC" defaultValue="L" id="MC_L" defaultChecked={metrics['MC'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MC_L" id="MC_L_Label" title="There is some loss of confidentiality. Access to some restricted information is obtained, but the attacker does not have control over what information is obtained, or the amount or kind of loss is constrained. The information disclosure does not cause a direct, serious loss to the impacted component.">Low</label>
                                <input name="MC" defaultValue="H" id="MC_H" defaultChecked={metrics['MC'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MC_H" id="MC_H_Label" title="There is total loss of confidentiality, resulting in all resources within the impacted component being divulged to the attacker. Alternatively, access to only some restricted information is obtained, but the disclosed information presents a direct, serious impact.">High</label>
                            </div>
                            <div className="metric">
                                <h3 id="MI_Heading" title="This metric measures the impact to integrity of a successfully exploited vulnerability. Integrity refers to the trustworthiness and veracity of information.">Modified Integrity (MI)</h3>
                                <input name="MI" defaultValue="X" id="MI_X" defaultChecked={metrics['MI'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MI_X" id="MI_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MI" defaultValue="N" id="MI_N" defaultChecked={metrics['MI'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MI_N" id="MI_N_Label" title="There is no loss of integrity within the impacted component.">None</label>
                                <input name="MI" defaultValue="L" id="MI_L" defaultChecked={metrics['MI'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MI_L" id="MI_L_Label" title="Modification of data is possible, but the attacker does not have control over the consequence of a modification, or the amount of modification is constrained. The data modification does not have a direct, serious impact on the impacted component.">Low</label>
                                <input name="MI" defaultValue="H" id="MI_H" defaultChecked={metrics['MI'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MI_H" id="MI_H_Label" title="There is a total loss of integrity, or a complete loss of protection. For example, the attacker is able to modify any/all files protected by the impacted component. Alternatively, only some files can be modified, but malicious modification would present a direct, serious consequence to the impacted component.">High</label>
                            </div>
                            <div className="metric">
                                <h3 id="MA_Heading" title="This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability. It refers to the loss of availability of the impacted component itself, such as a networked service (e.g., web, database, email). Since availability refers to the accessibility of information resources, attacks that consume network bandwidth, processor cycles, or disk space all impact the availability of an impacted component.">Modified Availability (MA)</h3>
                                <input name="MA" defaultValue="X" id="MA_X" defaultChecked={metrics['MA'] === 'X'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MA_X" id="MA_X_Label" title="Use the value assigned to the corresponding Base Score metric.">Not Defined (X)</label>
                                <input name="MA" defaultValue="N" id="MA_N" defaultChecked={metrics['MA'] === 'N'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MA_N" id="MA_N_Label" title="There is no impact to availability within the impacted component.">None</label>
                                <input name="MA" defaultValue="L" id="MA_L" defaultChecked={metrics['MA'] === 'L'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MA_L" id="MA_L_Label" title="There is reduced performance or interruptions in resource availability. Even if repeated exploitation of the vulnerability is possible, the attacker does not have the ability to completely deny service to legitimate users. The resources in the impacted component are either partially available all of the time, or fully available only some of the time, but overall there is no direct, serious consequence to the impacted component.">Low</label>
                                <input name="MA" defaultValue="H" id="MA_H" defaultChecked={metrics['MA'] === 'H'} type="radio" onChange={this.handleChange}/>
                                <label htmlFor="MA_H" id="MA_H_Label" title="There is total loss of availability, resulting in the attacker being able to fully deny access to resources in the impacted component; this loss is either sustained (while the attacker continues to deliver the attack) or persistent (the condition persists even after the attack has completed). Alternatively, the attacker has the ability to deny some availability, but the loss of availability presents a direct, serious consequence to the impacted component (e.g., the attacker cannot disrupt existing connections, but can prevent new connections; the attacker can repeatedly exploit a vulnerability that, in each instance of a successful attack, leaks a only small amount of memory, but after repeated exploitation causes a service to become completely unavailable).">High</label>
                            </div>
                        </div>
                        <div className={`scoreRating ${environmental.severity}`}>
                            <p className="needBaseMetrics"></p>
                            <span id="environmentalMetricScore">{environmental.score}</span>
                            <span id="environmentalSeverity">{environmental.severity}</span>
                        </div>
                    </fieldset>
                    <div className="end"/>
                </form>
            </div>
        </CVSSStyle>)
    }
}

const mapStateToProps = state => ({bountysList: state.bountysList, bountyCurrent: state.bountyCurrent, ethereumWallet: state.ethereumWallet, contractTransactions: state.contractTransactions, CVSSData: state.CVSSData})

const mapActionsToProps = {
    bountysListAction,
    bountyCurrentAction,
    depositEthAction,
    withdrawEthAction,
    checkOwnerAction,
    walletAddressAction,
    addCVSSMetricAction,
    calculateCVSSAction
}

export default connect(mapStateToProps, mapActionsToProps)(CVSSScore)

const CVSSStyle = styled.div`

#cvssReference {
  font-size: 100%;
}

fieldset {
  position: relative;
  background-color: #f2f2f2;
  margin-top: 50px;
  border:0;
  padding: 1em 0;
}

fieldset legend {
background-color: #666666;
color: #ffffff;
margin: 0;
width: 100%;
padding: 0.5em 0px;
text-indent: 1em;
}
fieldset div.metric {
  padding: 0;
  margin: 0.5em 0;
}

@media only screen and (min-width:768px) {
    fieldset div.column {
        width: 45%;
        margin: 0 0 0 1em;
    }
    fieldset div.column-left {
        float: left;
        height: auto;
    }
    fieldset div.column-right {
        float: right; height: auto;
    }
}

fieldset h3 {
    font-size: 1em;
    margin: 0;
    padding-left: 0.1em;
    }

fieldset input {
    display: none;
    width:auto;
    }

fieldset label {
    background: #cccccc;
    display: inline-block;
    margin: 3px;
    padding: 2px 5px;
    border: 0;
    cursor: pointer;
    font-size: 90%;
    border-radius: 5px;
    color: #666666;
    border: 1px solid #999999;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select:
    -moz-none;
    -ms-user-select: none;
    user-select: none;
}

fieldset label:hover {
    background: #666666;
    color: #ffffff;
    border: 1px solid #666666
}

fieldset input:checked + label {
    background: #a02020;
    border: 1px solid #a02020;
    color: #ffffff;
}

#vector {
    margin: 0 1em;
    padding:0;
}

#vectorString {
    display: none;
    border: 0;
    padding: 0;
    margin: 0;
    background-color: #a02020; /*#090;*/
    color: #ffffff;
    font-weight: bold;
    font-size:0.8em;
    width:50em;
    max-width:100%;
    }

.scoreRating {
    position: absolute;
    top:-36px;
    right:0;
    padding: 0 0.4em;
    margin: 0 15px;
    border: 2px solid #666666;
    background: #dddddd;
    font-size:11px;
    border-radius: 10px;
    width: 100px;
    height: auto;
    line-height: 150%;
    text-align: center;
    }

    .scoreRating.none, .scoreRating.low, .scoreRating.medium, .scoreRating.high, .scoreRating.critical {
        color:#ffffff;
    }

    .scoreRating.none     { background:#53aa33; border:2px solid #53aa33; }
    .scoreRating.low      { background:#ffcb0d; border:2px solid #ffcb0d; }
    .scoreRating.medium   { background:#f9a009; border:2px solid #f9a009; }
    .scoreRating.high     { background:#df3d03; border:2px solid #df3d03; }
    .scoreRating.critical { background:#cc0500; border:2px solid #cc0500; }
    .scoreRating span     { font-size: 150%; font-weight: bold; width: 100%; }
    .needBaseMetrics      { text-align:center; line-height:100%; padding-top:5px; font-size:15px; }

    #baseMetricScore,
    #temporalMetricScore,
    #environmentalMetricScore { display: block; font-size: 32px; line-height: 32px; font-weight: normal; margin-top: 4px; }

    #baseSeverity,
    #temporalSeverity,
    #environmentalSeverity { font-size: 16px; font-weight: normal; margin-bottom: 5px; display: block; }

    div#scriptWarning { border: solid red 2px; background: #f5dddd; padding: 1em 1em 1em 1em; margin: 0.4em 0; }

`
