import { useOrganization } from '@clerk/shared/react';
import React from 'react';

import { useProtect } from '../../common';
import { ORGANIZATION_PROFILE_NAVBAR_ROUTE_ID } from '../../constants';
import { useEnvironment, useOrganizationProfileContext } from '../../contexts';
import { NavBar, NavbarContextProvider } from '../../elements';
import { localizationKeys } from '../../localization';
import type { PropsOfComponent } from '../../styledSystem';

export const OrganizationProfileNavbar = (
  props: React.PropsWithChildren<Pick<PropsOfComponent<typeof NavBar>, 'contentRef'>>,
) => {
  const { organization } = useOrganization();
  const { pages } = useOrganizationProfileContext();
  const { billing } = useEnvironment().organizationSettings;

  const allowMembersRoute = useProtect(
    has =>
      has({
        permission: 'org:sys_memberships:read',
      }) || has({ permission: 'org:sys_memberships:manage' }),
  );

  const routes = pages.routes.filter(
    r =>
      (r.id !== ORGANIZATION_PROFILE_NAVBAR_ROUTE_ID.MEMBERS ||
        (r.id === ORGANIZATION_PROFILE_NAVBAR_ROUTE_ID.MEMBERS && allowMembersRoute)) &&
      !(r.id === ORGANIZATION_PROFILE_NAVBAR_ROUTE_ID.BILLING && !billing?.enabled),
  );

  if (!organization) {
    return null;
  }

  return (
    <NavbarContextProvider>
      <NavBar
        title={localizationKeys('organizationProfile.navbar.title')}
        description={localizationKeys('organizationProfile.navbar.description')}
        routes={routes}
        contentRef={props.contentRef}
      />
      {props.children}
    </NavbarContextProvider>
  );
};
