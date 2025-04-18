import styled from "@emotion/styled";

export const TOP_NAV_BAR_STYLE = {
  height: "68px",
};

export const TopNavBarLayout = styled.nav`
  top: 0px;
  left: 0px;
  width: 100%;
  height: fit-content;
  min-height: ${TOP_NAV_BAR_STYLE.height};
  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;

  box-shadow:
    rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;
