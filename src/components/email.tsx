import React from 'react';

interface EmailTemplateProps {
  reported: string,
  assigned: string,
  center: string,
  description: string,
  acutenessSelected: string,
  item: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = () => {
  const articleStyle: React.CSSProperties = {
    width: '600px',
    height: '700px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    boxSizing: 'border-box',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '50px 0 20px 80px',
    backgroundColor: 'rgb(103, 171, 249)',
    color: 'whitesmoke',
    width: '100%',
  };

  const h1Style: React.CSSProperties = {
    fontSize: '28px',
    border: '0',
    margin: '0',
    padding: '0',
  };

  const h3Style: React.CSSProperties = {
    fontSize: '14px',
    border: '0',
    margin: '0',
    padding: '0',
  };

  const mainStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    padding: '0 0 0 30px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    textAlign: 'left',
  };

  const h2Style: React.CSSProperties = {
    color: 'rgb(0, 28, 61)',
  };

  const pStyle: React.CSSProperties = {
    color: 'rgb(0, 28, 61)',
    fontSize: '18px',
  };

  const dividerStyle: React.CSSProperties = {
    width: '40%',
    margin: '20px 0',
    height: '2px',
    backgroundColor: 'rgb(103, 171, 249)',
    alignSelf: 'center',
  };

  const descriptionStyle: React.CSSProperties = {
    textAlign: 'center',
  };

  const footerStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    display: 'flex',
    padding: '0 0 0 30px',
  };

  const linkStyle: React.CSSProperties = {
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
    WebkitTransitionDuration: '0.4s',
  };

  const linkHoverStyle: React.CSSProperties = {
    transitionDuration: '0.1s',
    backgroundColor: '#99c7fb',
  };

  const linkAfterStyle: React.CSSProperties = {
    content: "''",
    display: 'block',
    position: 'absolute',
    borderRadius: '10px',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%',
    opacity: 0,
    transition: 'all 0.5s',
    boxShadow: '0 0 10px 40px #338ef7',
  };

  const linkActiveStyle: React.CSSProperties = {
    boxShadow: '0 0 0 0 #338ef7',
    position: 'absolute',
    borderRadius: '10px',
    left: '0',
    top: '0',
    opacity: 1,
    transition: '0s',
  };

  const linkActiveAfterStyle: React.CSSProperties = {
    top: '1px',
  };

  return (
    <div>
      <article style={articleStyle}>
        <header style={headerStyle}>
          <h3 style={h3Style}>Action Handler DHG</h3>
          <h1 style={h1Style}>Action Assignment Confirmed</h1>
        </header>

        <main style={mainStyle}>
          <h2 style={h2Style}>
            <strong>Hello Manuel Caballero</strong>
          </h2>

          <p style={pStyle}>
            We are informing of a new action assigned to you for the item{' '}
            <strong>Facility Issues</strong>. The action number is{' '}
            <strong>#6.</strong> You can contact <strong>Elizabeth Ventos</strong>{' '}
            who requested help to solve this issue. Here is the Issue description:
          </p>

          <div style={dividerStyle}></div>

          <p id="description" style={descriptionStyle}>
            Lobby TV is not working
          </p>
        </main>

        <footer style={footerStyle}>
          <p>
            To view the full action details, check status, or add comments, please
            click the link below:
          </p>

          <a
            href="https://nice-pond-000df0810.3.azurestaticapps.net/actions/1/6"
            style={linkStyle}
          >
            View Action
          </a>
        </footer>
      </article>
    </div>
  );
};

export default EmailTemplate;
