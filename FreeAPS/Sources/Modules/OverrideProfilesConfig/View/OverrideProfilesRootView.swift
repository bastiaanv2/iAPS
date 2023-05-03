import CoreData
import SwiftUI
import Swinject

extension OverrideProfilesConfig {
    struct RootView: BaseView {
        let resolver: Resolver

        @StateObject var state = StateModel()
        @State private var isEditing = false
        @State private var showAlert = false
        @State private var showingDetail = false
        @State private var isPresented = true
        @State private var alertSring = ""
        @Environment(\.dismiss) var dismiss

        private var formatter: NumberFormatter {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 0
            return formatter
        }

        private var glucoseFormatter: NumberFormatter {
            let formatter = NumberFormatter()
            formatter.numberStyle = .decimal
            formatter.maximumFractionDigits = 0
            if state.units == .mmolL {
                formatter.maximumFractionDigits = 1
            }
            formatter.roundingMode = .halfUp
            return formatter
        }

        var body: some View {
            Form {
                Section(
                    header: Text("Override your Basal, ISF, CR and Target profiles"),
                    footer: Text("" + (!state.isEnabled ? "Currently no Override active" : ""))
                ) {
                    Toggle(isOn: $state.isEnabled) {
                        Text("Override Profiles")
                    }._onBindingChange($state.isEnabled, perform: { _ in
                        if !state.isEnabled {
                            state.duration = 0
                            state.percentage = 100
                            state._indefinite = false
                            state.saveSettings()
                        }
                    })
                }
                if state.isEnabled {
                    Section(
                        header: Text("Total Insulin Adjustment"),
                        footer: Text(
                            "Your profile basal insulin will be adjusted with the override percentage and your profile ISF and CR will be inversly adjusted with the percentage.\n\nIf you toggle off the override every profile setting will return to normal."
                        )
                    ) {
                        VStack {
                            Slider(
                                value: $state.percentage,
                                in: 10 ... 200,
                                step: 1,
                                onEditingChanged: { editing in
                                    isEditing = editing
                                }
                            ).accentColor(state.percentage >= 130 ? .red : .blue)
                            Text("\(state.percentage.formatted(.number)) %")
                                .foregroundColor(
                                    state
                                        .percentage >= 130 ? .red :
                                        (isEditing ? .orange : .blue)
                                )
                                .font(.largeTitle)
                            Spacer()
                            Toggle(isOn: $state._indefinite) {
                                Text("Enable indefinitely")
                            }
                        }
                        if !state._indefinite {
                            HStack {
                                Text("Duration")
                                DecimalTextField("0", value: $state.duration, formatter: formatter, cleanInput: false)
                                Text("minutes").foregroundColor(.secondary)
                            }
                        }

                        HStack {
                            Toggle(isOn: $state.override_target) {
                                Text("Override Profile Target")
                            }
                        }
                        if state.override_target {
                            HStack {
                                Text("Target Glucose")
                                DecimalTextField("0", value: $state.target, formatter: glucoseFormatter, cleanInput: false)
                                Text(state.units.rawValue).foregroundColor(.secondary)
                            }
                        }

                        Button("Save") {
                            showAlert.toggle()

                            alertSring = "Selected Override:\n\n\(state.percentage.formatted(.number)) %, " +
                                (state.duration > 0 ? "\(state.duration) min" : " infinite duration.") +
                                (state.target == 0 ? "" : (" Target: \(state.target) " + state.units.rawValue + "."))
                                +
                                "\n\n"
                                +
                                "Saving this override will change your basal insulin, ISF, CR and eventual Target Glucose during the entire selected duration. Tapping save will start your new overide or edit your current active override."
                        }
                        .disabled(
                            state.isEnabled == false || state
                                .percentage == 100 || (!state._indefinite && state.duration == 0)
                        )
                        .accentColor(.orange)
                        .buttonStyle(BorderlessButtonStyle())
                        .font(.callout)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .controlSize(.mini)
                        .alert(
                            alertSring,
                            isPresented: $showAlert,
                            actions: {
                                Button("Cancel", role: .cancel) {}
                                Button("Start Override", role: .destructive) {
                                    if state.percentage == 100 {
                                        state.isEnabled = false
                                    } else { state.isEnabled = true }
                                    if state._indefinite {
                                        state.duration = 0
                                    } else if state.duration == 0 {
                                        state.isEnabled = false
                                    }
                                    state.saveSettings()
                                    dismiss()
                                }
                            }
                        )
                    }
                }
            }.onAppear { state.savedSettings() }
        }
    }
}
