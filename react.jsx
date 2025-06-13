import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch } from "../../store/hooks"; // Assuming you have a custom hook for dispatch
import { setShowDeleteModal } from "../../store/slices/modalSlice";
import { deleteAccount } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/useAuth";
import { useAnalytics } from "../../hooks/useAnalytics";
import { useUser } from "../../hooks/useUser";
import { useTheme } from "../../hooks/useTheme";
import { useIsMobile } from "../../hooks/useIsMobile";
import { useIsDarkMode } from "../../hooks/useIsDarkMode";
import { useIsLoggedIn } from "../../hooks/useIsLoggedIn";
import { useIsAdmin } from "../../hooks/useIsAdmin";

export const DeleteAccountModal = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showDeleteModal } = useUser();
  const { showToast } = useToast();
  const { trackEvent } = useAnalytics();
  const { isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const isLoggedIn = useIsLoggedIn();
  const isAdmin = useIsAdmin();

  const handleClose = () => {
    dispatch(setShowDeleteModal(false));
  };
  const handleOpen = () => {
    dispatch(setShowDeleteModal(true));
  };
  
  const handleDeleteAccount = async () => {
    if (isLoggedIn) {
      await dispatch(deleteAccount());
      showToast(t("account.deleted"));
      trackEvent("account_deleted");
      navigate("/");
    }
    handleClose();
  };

  return (
    <Modal
      show={showDeleteModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
      dialogClassName={`delete-account-modal ${isDarkMode ? "dark-mode" : ""}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t("account.delete.title")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t("account.delete.confirmation")}</p>
        {isAdmin && (
          <p className="text-warning">
            {t("account.delete.admin_warning")}
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {t("common.cancel")}
        </Button>
        <Button variant="danger" onClick={handleDeleteAccount}>
          {t("account.delete.confirm")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}