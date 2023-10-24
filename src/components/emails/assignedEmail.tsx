import * as React from 'react';

interface EmailTemplateProps {
  ActionId: number;
  On: string;
  ReportedByUserId: number;
  ReportedBy: string;
  ReportedByEmail: string;
  AssignedToUserId: number;
  AssignedTo: string;
  AssignedToEmail: string;
  Item: string;
  Status: string;
  ActionDescription: string;
  Acuteness: string;
  Center: string;
  Resolution: null | string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  ActionId,
  On,
  ReportedByUserId,
  ReportedBy,
  ReportedByEmail,
  AssignedToUserId,
  AssignedTo,
  AssignedToEmail,
  Item,
  Status,
  ActionDescription,
  Acuteness,
  Center,
}) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Changed justifyItems to justifyContent
    boxSizing: 'border-box',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    border: 0,
  }}>
    <div style={{
      width: '600px',
      height: '700px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      boxSizing: 'border-box',
      padding: '20px',
    }}>
      <div style={{
        boxSizing: 'border-box',
        padding: '50px 0 20px 80px',
        backgroundColor: 'rgb(103, 171, 249)',
        color: 'whitesmoke',
        width: '100%',
      }}>
        <h3>Action Handler DHG</h3>
        <h1>Action Assignment Confirmed</h1>
      </div>

      <div style={{
        boxSizing: 'border-box',
        padding: '0 0 0 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        textAlign: 'left',
      }}>
        <h2><strong>Hello {AssignedTo}</strong></h2>
        <p>We are informing of a new action assigned to you for the item: <strong>{Item}</strong>. The action
          number is <strong>{ActionId}</strong> and this is a {Acuteness} issue. You can contact <strong>{ReportedBy}</strong> from the {Center} center, who requested help to solve
          this issue. Here is the Issue description:</p>

        <div style={{
          width: '40%',
          margin: '20px 0',
          height: '2px',
          backgroundColor: 'rgb(103, 171, 249)',
          alignSelf: 'center',
        }}></div>
        <p style={{
          textAlign: 'center',
          padding: 0,
        }}>{ActionDescription}</p>
      </div>

      <div style={{
        boxSizing: 'border-box',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        display: 'flex',
        padding: '0 0 0 30px',
      }}>
        <p>To view the full action details, check status or add comments, please click the link below:</p>
        <a href={`https://nice-pond-000df0810.3.azurestaticapps.net/actions/${AssignedToUserId}/${ActionId}`} style={{
          position: 'relative',
          backgroundColor: '#66aaf9',
          borderRadius: '10px',
          fontSize: '16px',
          color: 'white',
          padding: '20px 40px',
          cursor: 'pointer',
          userSelect: 'none',
          textAlign: 'center',
          textDecoration: 'none',
          transitionDuration: '0.4s',
          WebkitTransitionDuration: '0.4s', // Safari
        }}>View Action</a>
      </div>
    </div>
  </div>
);
