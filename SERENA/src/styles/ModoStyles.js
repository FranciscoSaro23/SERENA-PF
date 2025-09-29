import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  // CONTENEDORES BÁSICOS
  wrapper: {
    flex: 1,
    backgroundColor: "#FFFFF6",
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#FFFFF6",
    position: 'relative',
  },
  container: {
    padding: 20,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 200,
  },
  listContainer: {
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // TÍTULOS
  pageTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#161A68",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#161A68",
    textAlign: "center",
    marginBottom: 24,
  },

  // LABELS
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 6,
    marginTop: 15,
  },

  // INPUTS
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 18,
    fontSize: 16,
    color: "#0A0D41",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    color: "#9CA3AF",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },

  // BOTONES PRINCIPALES
  botonGuardar: {
    backgroundColor: "#161A68",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 4,
  },
  textoBotonGuardar: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  botonEnviar: {
    backgroundColor: "#E0F7FA",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 32,
  },
  textoBoton: {
    color: "#161A68",
    fontSize: 18,
    fontWeight: "600",
  },

  // BOTÓN SECUNDARIO
  nuevaCancionBtn: {
    backgroundColor: "#0A0D41",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 24,
  },
  nuevaCancionText: {
    color: "#FFFFF6",
    fontSize: 14,
    fontWeight: "600",
  },

  // COVER + EMBED
  coverContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  cover: {
    width: 200,
    height: 200,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  embedContainer: {
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },

  // SLIDER
  sliderContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  sliderValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#161A68",
    textAlign: "center",
    marginBottom: 10,
  },

  // MENSAJES
  message: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    padding: 10,
    borderRadius: 12,
  },
  successMessage: {
    backgroundColor: "#D1FAE5",
    color: "#065F46",
    fontWeight: "600",
  },
  errorMessage: {
    backgroundColor: "#FEE2E2",
    color: "#991B1B",
    fontWeight: "600",
  },

  // COLORES
  colorDisplay: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
  },
  picker: {
    height: 200,
    width: "100%",
    marginBottom: 24,
  },
  pickerDisabled: {
    opacity: 0.5,
  },

  // MODOS (PredeterminadosScreen)
  modeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
  },
  lockedContainer: {
    backgroundColor: "#F3F4F6",
    borderColor: "#D1D5DB",
  },
  unlockedContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#161A68",
    marginRight: 12,
  },
  modeText: {
    flex: 1,
    fontSize: 16,
  },
  lockedText: {
    color: "#161A68",
  },
  unlockedText: {
    color: "#161A68",
    fontWeight: "600",
  },
  icon: {
    fontSize: 18,
  },

  // BOTÓN PERSONALIZAR
  customizeButton: {
    marginTop: 20,
    backgroundColor: "#E0F7FA",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
  },
  customizeText: {
    color: "#161A68",
    fontWeight: "600",
    fontSize: 16,
  },

  // EDIT MODE (cuando haces longPress en un modo)
  editContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  renameButton: {
    backgroundColor: "#FCD34D",
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  deleteButton: {
    backgroundColor: "#EF4444",
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  cancelButton: {
    backgroundColor: "#D1D5DB",
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
  },
  actionButtonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "600",
  },
});
