import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import OpenSansLight from '../../../../media/fonts/OpenSans-Light.ttf';
import OpenSansRegular from '../../../../media/fonts/OpenSans-Regular.ttf';
import OpenSansMedium from '../../../../media/fonts/OpenSans-Medium.ttf';
import OpenSansSemiBold from '../../../../media/fonts/OpenSans-SemiBold.ttf';
import OpenSansBold from '../../../../media/fonts/OpenSans-Bold.ttf';
import OpenSansExtraBold from '../../../../media/fonts/OpenSans-ExtraBold.ttf';
import formula_m from '../../../../media/laudos/lip/formula_m.png'
import formula_ibutg from '../../../../media/laudos/lip/formula_ibutg.png'
import formula_pt from '../../../../media/laudos/lip/formula_pt.png'
import formula_pr from '../../../../media/laudos/lip/formula_pr.png'
import formula_silica from '../../../../media/laudos/lip/formula_silica.png'

function LipGenerate({ inventario, plano,
  company, unidades, setores, cargos, contatos,
  processos, riscos, user, aparelhos, data, }) {

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidades.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setores.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'nome_processo':
          const processoEncontrado = processos.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.nome_processo : 'N/A';

        case 'nome_aparelho':
          const aparelhosEncontrado = aparelhos.find((c) => c.id_aparelho === item);
          const aparelho = `${aparelhosEncontrado.nome_aparelho} - ${aparelhosEncontrado.marca_aparelho} (${formatData(aparelhosEncontrado.data_calibracao_aparelho)})`
          return aparelho;

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
        case 'esocial':
          const riscoEncontrado = riscos.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco || "N/A";
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco || "N/A";
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco || "N/A";
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco || "N/A";
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco || "0";
              case 'metodologia':
                return riscoEncontrado.metodologia_risco || "N/A";
              case 'severidade':
                return riscoEncontrado.severidade_risco || "N/A";
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
              case 'esocial':
                return riscoEncontrado.codigo_esocial_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const formatData = (item) => {
    try {
      const data_formatada = new Date(item).toLocaleDateString('pr-BR');
      return data_formatada || 'N/A';
    } catch (error) {
      console.log("Erro ao formatar data!", error);
    }
  };

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return medidasArray.map(({ nome, tipo }) => `${tipo}: ${nome}`).join('\n');
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const findSetor = (item) => {
    const findSetor = setores.find((i) => i.id_setor === item);
    return findSetor ? findSetor.nome_setor : "N/A";
  };

  const getTotalFuncMasc = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
  };

  const getTotalFuncFem = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
  };

  const getTotalFuncMenor = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_menor, 0);
  };

  const getTotalFunc = () => {
    const funcMasc = cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
    const funcFem = cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
    const funcMenor = cargos.reduce((total, cargo) => total + cargo.func_menor, 0);

    return funcMasc + funcFem + funcMenor;
  };

  const setVigencia = (item) => {
    try {
      const dataCalculada = new Date(item);

      dataCalculada.setFullYear(dataCalculada.getFullYear() + 2);
      return formatData(dataCalculada);
    } catch (error) {
      console.log("Erro ao calcular data", error)
    }
  };

  Font.register({ family: 'OpenSansLight', src: OpenSansLight });
  Font.register({ family: 'OpenSansRegular', src: OpenSansRegular });
  Font.register({ family: 'OpenSansMedium', src: OpenSansMedium });
  Font.register({ family: 'OpenSansSemiBold', src: OpenSansSemiBold });
  Font.register({ family: 'OpenSansBold', src: OpenSansBold });
  Font.register({ family: 'OpenSansExtraBold', src: OpenSansExtraBold });


  const PageStyles = StyleSheet.create({
    pageCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    Page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    LandscapePage: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: '100%',
    },

    coverPage: {
      backgroundColor: '#ad2831',
      padding: 10,
      color: '#fff',
    },
  });

  const TextStyles = StyleSheet.create({
    headerText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 5,
      paddingTop: 10,
      fontFamily: 'OpenSansBold',
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    centerText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontFamily: 'OpenSansExtraBold',
    },

    SignatureDate: {
      fontSize: 10,
      textAlign: 'left',
      color: '#343a40',
      fontFamily: 'OpenSansLight',
    },

    officeText: {
      fontSize: 12,
      fontFamily: 'OpenSansRegular',
    },

    officeSmallText: {
      fontSize: 10,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    smallText: {
      fontSize: 12,
    },

    littleText: {
      fontSize: 10,
      textAlign: 'center',
      fontFamily: 'OpenSansRegular',
    },

    smallTextVigencia: {
      fontSize: 10,
    },

    subTitleSumary: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      fontFamily: 'OpenSansBold',
    },

    subSubTitleSumary: {
      fontSize: 12,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      fontFamily: 'OpenSansBold'
    },

    prefixText: {
      fontSize: 8,
      color: '#6c757d',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    prefixTextTitle: {
      fontSize: 8,
      color: '#ced4da',
      marginRight: 5,
      fontFamily: 'OpenSansLight',
    },

    valueText: {
      fontSize: 10,
      fontFamily: 'OpenSansRegular',
    },

    valueTextTitle: {
      fontSize: 14,
      color: '#f8f9fa',
      fontFamily: 'OpenSansMedium',
    },

    valueTextSignatureTitle: {
      fontSize: 12,
      color: '#f8f9fa',
      fontFamily: 'OpenSansBold',
    },

    footerText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 5,
      fontFamily: 'OpenSansBold',
    },

    footerAddresText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 2,
      color: '#6c757d',
      fontFamily: 'OpenSansLight',
    },

    title: {
      fontSize: 12,
      fontFamily: 'OpenSansBold',
    },

    paragraph: {
      fontSize: 10,
      textAlign: 'justify',
      textTransform: 'none',
      marginBottom: 10,
      fontFamily: 'OpenSansRegular',
    },

    tableTitle: {
      fontFamily: 'OpenSansBold',
      fontSize: 10,
      color: '#ffffff',
      textAlign: 'center',
    },

    tableTitleSize8: {
      fontFamily: 'OpenSansBold',
      fontSize: 8,
      color: '#ffffff',
      textAlign: 'center',
    },

    contentTableText: {
      fontFamily: 'OpenSansRegular',
      fontSize: 8,
    },

    listItem: {
      marginBottom: 5,
      fontSize: 10,
      fontFamily: 'OpenSansLight',
    },

    listItemRoman: {
      marginBottom: 5,
      fontSize: 10,
      fontFamily: 'OpenSansBold',
    },
  });

  const ContainerStyles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      borderBottom: '1 solid #e5e5e5',
      marginBottom: 20,
    },

    centerContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },

    bottomContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    bottomContainerVigencia: {
      marginTop: 'auto',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    signatureContainer: {
      width: '100%',
      marginTop: 50,
    },

    footerContainer: {
      marginTop: 'auto',
      width: '100%',
      borderTop: '1 solid #e5e5e5',
    },

    textContainer: {
      marginTop: 10,
      marginLeft: 10,
    },

    space10: {
      paddingTop: 10,
      paddingBottom: 10,
    },

    space: {
      paddingTop: 5,
      paddingBottom: 5,
    },

    spaceTop20: {
      paddingTop: 20,
    },

    list: {
      marginLeft: 10,
      marginBottom: 10,
    },

    listRoman: {
      marginRigth: 10,
    },
  });

  const TableStyles = StyleSheet.create({
    table: {
      marginTop: 10,
      width: '100%',
      marginBottom: 10,
    },

    headerCell: {
      padding: 5,
      backgroundColor: '#0077b6',
      width: '100%',
    },

    headerTable: {
      padding: 2,
      backgroundColor: '#0077b6',
      flexDirection: 'row',
    },

    headerCellTable: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },

    tableRow: {
      borderBottom: '1 solid #343a40',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },

    seventyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '75%',
    },

    fiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
    },

    fortyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '40%',
    },

    twentyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '25%',
    },

    twentyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '20%',
    },

    fifTeenRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '15%',
    },

    headerSignatureContentCell: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
      flexDirection: 'row',
    },

    headerSignatureCell: {
      width: '50%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    signatureLine: {
      height: '20%',
      borderBottom: '1 solida #343a40'
    },

    officeFiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 20,
      width: '50%',
      alignItems: 'center',
      justifyContent: 'center',
    },

    contentTable: {
      flexDirection: 'row',
    },

    contentCell: {
      border: '0.3 solid #333333',
      height: '100%',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 2,
    },

    Column: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: '1 solida #495057',
    },

    headerColumn: {
      flex: 1,
      width: '30%',
      backgroundColor: '#0077b6',
      color: '#ffffff',
      padding: 8,
      fontSize: 11,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'OpenSansBold',
    },

    contentColumn: {
      width: '70%',
      flex: 2,
      padding: 5,
      fontSize: 8,
      textAlign: 'justify',
      justifyContent: 'center',
      fontFamily: 'OpenSansRegular',
    },

  });

  const HeaderPage = () => {
    return (
      <View style={ContainerStyles.headerContainer}>
        <Text style={TextStyles.headerText}>Laudo de Insalubridade e Periculosidade - LIP</Text>
        <Text style={TextStyles.littleText}>{company.nome_empresa}</Text>
      </View>
    );
  }

  const FooterPage = () => {
    return (
      <View style={ContainerStyles.footerContainer}>
        <Text style={TextStyles.footerText}>Medwork - Medicina e Segurança do Trabalho</Text>
        <Text style={TextStyles.footerAddresText}>Rua Paes Leme, 1076 - Londrina/PR - Contato: (43) 3322-3010</Text>
      </View>
    );
  }

  const CoverPage = () => {
    return (
      <Page size="A4" style={PageStyles.Page}>
        <Text style={TextStyles.headerText}>Laudo de Insalubridade e Periculosidade - LIP</Text>
        <View style={ContainerStyles.centerContainer}>
          <Text style={TextStyles.centerText}>{company.nome_empresa}</Text>
        </View>
        <View style={ContainerStyles.bottomContainerVigencia}>
          <Text style={TextStyles.smallTextVigencia}>Londrina, {formatData(data)} - Vigência: {setVigencia(data)}</Text>
        </View>
      </Page>
    )
  };

  const SumaryPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <HeaderPage />
        <Text style={TextStyles.topText}>Sumário</Text>
        <FooterPage />
      </Page>
    );
  };

  const ObjectivePage = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}> 2. Objetivo</Text>

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.paragraph}>
            O Ministério do Trabalho e Emprego, através da Portaria 3214, regulamentou toda a matéria de Segurança e Medicina do Trabalho, através de 36 Normas Regulamentadoras, estando inseridas na NR15 e seus 14 anexos as atividades e operações insalubres, assim consideradas as que se desenvolvem:
          </Text>

          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Acima dos limites de tolerância previstos nos anexos 1, 2, 3, 5, 11 e 12.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Nas atividades mencionadas nos anexos 6 e 14.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Comprovadas através de laudo de inspeção do local de trabalho, constantes dos anexos 7, 8, 9, 10 e 13.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} O anexo 4 foi revogado pela portaria 3.751, de 23/11/1990.</Text>
          </View>

          <Text style={TextStyles.paragraph}>Atualmente a lei 6.514/77 determina o pagamento do adicional em 3 graus diferentes: mínimo, médio e máximo, sobre o salário mínimo, da categoria, base ou conforme convenção coletiva, conforme tabela abaixo:</Text>
        </View>
        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: '25%' }]}>
              <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}> Anexo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '50%' }]}>
              <Text style={TextStyles.tableTitle}> Agente</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '25%' }]}>
              <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}> Grau de Insalubridade</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>1</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Ruído contínuo ou intermitente</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>2</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Ruído de Impacto</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>3</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Calor</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>4</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Revogado pela portaria 3751 de 23-11-90</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>-</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>5</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Radiações Ionizantes</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>40%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>6</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Condições Hiperbáricas</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>40%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>7</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Radiações não ionizantes</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>8</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Vibrações</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>9</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Frio</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>10</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Umidade</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>11</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Agentes químicos acima do limite de tolerância</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>10%, 20% e 40%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>12</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Poeiras Minerais</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>40%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>13</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Agentes químicos com inspeção no local de trabalho</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>14</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Agentes Biológicos</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>20% e 40%</Text>
            </View>
          </View>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ObjectivePageContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer} wrap={true}>
          <Text style={TextStyles.paragraph}>Serão considerados os seguintes agentes periculosos, conforme a Norma Regulamentadora nº 16. O Adicional de periculosidade é único, com percentual de 30% sobre o salário devido.</Text>
        </View>

        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: '20%' }]}>
              <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}> Anexo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '60%' }]}>
              <Text style={TextStyles.tableTitle}> Agente</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '20%' }]}>
              <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}>Grau de Periculosidade</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>1</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas com explosivos.</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>2</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas com inflamáveis.</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>3</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas com exposição a roubos ou outras espécies de violência física nas atividades profissionais de segurança pessoal ou patrimonial</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>4</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas com energia elétrica.</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>5</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas em motocicleta </Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>6</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10 }]}>Atividades e operações perigosas com radiações ionizantes ou substâncias radiotivas</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>30%</Text>
            </View>
          </View>
        </View>

        <View style={ContainerStyles.spaceTop20}></View>

        <Text style={TextStyles.subTitleSumary}>3. Metodologia</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>O presente laudo será elaborado seguindo as seguintes etapas e considerações técnicas:</Text>
        </View>

        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: '20%' }]}>
              <Text style={TextStyles.tableTitle}>Item</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '30%' }]}>
              <Text style={TextStyles.tableTitle}>Etapa</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '50%' }]}>
              <Text style={TextStyles.tableTitle}>Realizar a descrição dos itens abaixo</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>1</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Identificação</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} nome, endereço e CNPJ da empresa</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>2</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Identificação do local avaliado</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} nome do setor</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} descrição do setor</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>3</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Descrição do ambiente de trabalho</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} arranjo físico</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} tipo de construção</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} metragens</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} condições de higiene, ventilação e iluminação</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} tipo de cobertura, paredes, janelas e pisos</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} mobiliários e maquinários</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>4</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Análise qualitativa</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} as atividades do trabalhador</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} as etapas do processo operacional</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} os riscos ocupacionais</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} o tempo de exposição ao risco</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>5</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Análise quantitativa</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} medição dos riscos como: calor, ruído, agentes químicos</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} descrever a metodologia de avaliação NHO, NIOSH, etc</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>6</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Conclusão</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} fundamento científico: detalhar as doenças de acordo com os riscos</Text>
              <Text style={TextStyles.contentTableText}>{'\u2022'} fundamento legal: realizar o enquadramento do agente periciado nas normas regulamentadoras</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '20%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>7</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '30%' }]}>
              <Text style={TextStyles.contentTableText}>Proposta técnica para correção</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '50%' }]}>
              <Text style={TextStyles.contentTableText}>{'\u2022'} descrever as propostas para eliminação da insalubridade através de mudança do processo operacional ou utilização de EPIs</Text>
            </View>
          </View>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimit = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>3. Limites de Tolerância</Text>

        <View style={ContainerStyles.spaceTop20}></View>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.1. Ruído</Text>
        </View>

        <View style={[TableStyles.table, { paddingHorizontal: 50 }]}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: '40%' }]}>
              <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}> Nível dB(A)</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: '60%' }]}>
              <Text style={TextStyles.tableTitle}> Máxima Exposição Diária Permissíveis </Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>85</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>8 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>86</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>7 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>87</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>6 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>88</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>5 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>89</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>4 horas e 30 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>90</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>4 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>91</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>3 horas e 30 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>91</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>3 horas e 30 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>92</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>3 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>93</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>2 horas e 40 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>94</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>2 horas e 15 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>95</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>2 horas.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>96</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>1 hora e 45 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>98</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>1 hora e 15 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>100</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>1 hora</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>102</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>45 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>104</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>35 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>105</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>30 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>106</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>25 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>108</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>20 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>110</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>15 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>112</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>10 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>114</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>8 minutos.</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '40%' }]}>
              <Text style={[TextStyles.contentTableText, { textAlign: 'center', fontSize: 10 }]}>115</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '60%' }]}>
              <Text style={[TextStyles.contentTableText, { fontSize: 10, textAlign: 'center' }]}>7 minutos.</Text>
            </View>
          </View>
        </View>

        <View style={ContainerStyles.spaceTop20}></View>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.1.1 Metodologia de Avaliação e Interpretação de Resultados</Text>
          <View style={ContainerStyles.space}></View>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A metodologia de avaliação de ruído deve seguir as orientações da Norma de Higiene Ocupacional - NHO 01 - da Fundacentro.</Text>
          </View>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitRuido = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Segundo a NHO 01, os equipamentos de medição, quando em uso, devem estar calibrados e em perfeitas condições eletromecânicas. Antes de iniciar as medições deve-se:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Verificar a integridade eletromecânica e coerência na resposta do instrumento.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Verificar as condições de carga das baterias.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Ajustar os parâmetros de medição, conforme o critério a ser utilizado.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Efetuar a calibração de acordo com as instruções do fabricante.</Text>
          </View>

          <View style={ContainerStyles.space}></View>

          <Text style={TextStyles.paragraph}>A Norma de Higiene Ocupacional 01 da Fundacentro determina que as medições devem ser feitas com o microfone posicionado dentro da zona auditiva do trabalhador, de forma a fornecer dados representativos da exposição ocupacional diária ao ruído a que está submetido o trabalhador no exercício de suas funções. No caso de medidores de uso pessoal, o microfone deve ser posicionado sobre o ombro, preso na vestimenta, dentro da zona auditiva do trabalhador.</Text>
          <Text style={TextStyles.paragraph}>A interpretação dos resultados deve ser confrontada entre o resultado obtido pelo mostrador com a tabela de limite de tolerância descrita na NR-15 anexo I.</Text>
          <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15, determina que se durante a jornada de trabalho ocorrerem dois ou mais períodos de exposição a ruído de diferentes níveis, devem ser considerados os seus efeitos combinados, de forma que, se a soma do tempo total de exposição, dividido pelo tempo de exposição máxima permissível a este nível, exceder a unidade, a exposição estará acima dos limites de tolerância.</Text>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.1.2 Medidas de Controle</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>As medidas de controle do ruído podem ser consideradas basicamente em 3 maneiras distintas: na fonte, na trajetória e no homem.</Text>
          <View style={TableStyles.table}>
            <View style={TableStyles.Column}>
              <View style={TableStyles.headerColumn}>
                <Text style={TextStyles.tableTitle}>Na Fonte</Text>
              </View>
              <View style={TableStyles.contentColumn}>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Substituir o equipamento por outro mais silencioso.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Balancear e equilibrar partes móveis.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Lubrificar mancais, rolamentos, etc.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Alterar o processo.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Aplicar material de modo a atenuar as vibrações.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Regular os motores.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Reapertar as estruturas. </Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Substituir engrenagens metálicas por material de plástico ou celeron.</Text>
              </View>
            </View>
            <View style={TableStyles.Column}>
              <View style={TableStyles.headerColumn}>
                <Text style={TextStyles.tableTitle}>Na Trajetória</Text>
              </View>
              <View style={TableStyles.contentColumn}>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Isolar a fonte.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Isolar o receptor.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Evitar a propagação com barreiras.</Text>
              </View>
            </View>
            <View style={TableStyles.Column}>
              <View style={TableStyles.headerColumn}>
                <Text style={TextStyles.tableTitle}>No Homem</Text>
              </View>
              <View style={TableStyles.contentColumn}>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Limitar o tempo de exposição.</Text>
                <Text style={TextStyles.contentTableText}>{'\u2022'} Fornecer protetores auriculare.</Text>
              </View>
            </View>
          </View>

          <Text style={TextStyles.paragraph}>Para enquadramento da atividade como insalubre, se for constatado o ruído acima dos limites de tolerância, deve analisar apenas as medidas de controle sobre o homem que podem ser feitas através da utilização de protetores auriculares ou através da redução do tempo de exposição ao ruído.</Text>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitCalor = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subSubTitleSumary}>3.2. Calor</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.2.1 Conceito</Text>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>O calor que o organismo precisa dissipar, para manter o equilíbrio homeotérmico, pode originar-se de duas fontes interna e externa.</Text>
            <Text style={TextStyles.paragraph}>A fonte interna é originada pelo metabolismo do indivíduo, enquanto as fontes externas são classificadas por:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Condução: calor transmitido entre sólidos em contato direto.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Convecção: característico dos fluidos. Troca de calor devido aos movimentos do ar em contato com a pele.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Radiação: transmissão de calor por meio de raios ou ondas que se processam através do espaço vazio, sem contato.</Text>
            </View>
          </View>

          <View style={ContainerStyles.space}></View>
          <Text style={TextStyles.subSubTitleSumary}>3.2.2 Limites de Tolerância</Text>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Segundo a Norma Regulamentadora de nº 15, os trabalhos em que há exposição a calor, acima dos limites de tolerância, serão considerados insalubres em grau médio. A exposição ao calor deve ser avaliada através do IBUTG (Índice de Bulbo Úmido) Termômetro de Globo definido pelas equações que se segue: </Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Ambientes internos ou externos sem carga solar.</Text>
            </View>

            <Text style={TextStyles.paragraph}>IBUTG = 0,7 tbn + 0,3 tg: </Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Ambientes externos com carga solar.</Text>
            </View>

            <Text style={TextStyles.paragraph}>IBUTG = 0,7 tbn + 0,1 tbs + 0,2 tg</Text>

            <Text style={TextStyles.paragraph}>onde:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} tbn - Temperatura de bulbo úmido natural.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} tg - Temperatura do globo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} tbs - Temperatura de bulbo seco.</Text>
            </View>

            <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15, em seu anexo 3, determina que o perito deva analisar os tipos de atividades desenvolvidas para aplicação da norma. São considerados dois tipos de trabalho: com exposição ao calor com regime de trabalho intermitente com períodos de descanso no próprio local de prestação de serviço e exposição ao calor em regime de trabalho intermitente com período de descanso em outro local. </Text>

            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>a)  Limites de tolerância para exposição ao calor, em regime de trabalho intermitente com períodos de descanso no próprio local de prestação de serviços. </Text>
            </View>
          </View>
        </View>
        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitCalorTable = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Em função do índice obtido, o regime de trabalho intermitente será definido na tabela a seguir:</Text>

          <View style={TableStyles.table}>
            <View style={TableStyles.headerTable}>
              <View style={[TableStyles.headerCell, { width: '40%' }]}>
                <Text style={TextStyles.tableTitle}>Regime de Trabalho intermitente com descanso no próprio local de trabalho (por hora)</Text>
              </View>
              <View style={[TableStyles.headerCell, { width: '60%' }]}>
                <Text style={TextStyles.tableTitle}>Tipo de Atividade</Text>
                <View style={TableStyles.headerCellTable}>
                  <View style={[TableStyles.headerCell, { width: '33%' }]}>
                    <Text style={TextStyles.tableTitle}>Leve</Text>
                  </View>
                  <View style={[TableStyles.headerCell, { width: '33%' }]}>
                    <Text style={TextStyles.tableTitle}>Moderada</Text>
                  </View>
                  <View style={[TableStyles.headerCell, { width: '33%' }]}>
                    <Text style={TextStyles.tableTitle}>Pesada</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>Trabalho Conínuo</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Até 30,0</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Até 26,7</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Até 25,0</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>45 minutos trabalho</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>30,1 à 30,6</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>26,8 à 28,8</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>25,1 à 25,9</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>15 minutos descanso</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>30,1 à 30,6</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>26,8 à 28,8</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>25,1 à 25,9</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>30 minutos de trabalho</Text>
                <Text style={TextStyles.contentTableText}>30 minutos de descanso</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>30,7 à 31,4</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>28,1 à 29,4</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>26,0 à 27,9</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>15 minutos de trabalho</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>31,5 à 32,2</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>29,5 à 31,1</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>28,0 à 30,0</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>30 minutos de descanso</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>31,5 à 32,2</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>29,5 à 31,1</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>28,0 à 30,0</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>Não é permitido o trabalho sem a adoção de medidas adequadas de controlo</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Acima de 32,2</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Acima de 31,1</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>Acima de 30,0</Text>
              </View>
            </View>
          </View>

          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>
              b) Limites de tolerância para exposição ao calor, em regime de trabalho intermitente com períodos de
              descanso em outro local
            </Text>
          </View>

          <Text style={TextStyles.paragraph}>Considera-se como local de descanso, ambiente termicamente mais ameno, com o trabalhador em repouso ou exercendo atividade leve. Os limites de tolerância são dados segundo o quadro a seguir:</Text>
          <Text style={TextStyles.paragraph}>Limites de tolerância com descanso em outro local</Text>

          <View style={[TableStyles.table, { paddingHorizontal: 60 }]}>
            <View style={TableStyles.headerTable}>
              <View style={[TableStyles.headerCell, { width: '50%' }]}>
                <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}>M (Kcal/h)</Text>
              </View>
              <View style={[TableStyles.headerCell, { width: '50%' }]}>
                <Text style={[TextStyles.tableTitle, { textAlign: 'center' }]}>Máximo IBUTG</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>175</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>30,5</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>200</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>30,0</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>250</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>28,5</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>300</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>27,5</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>350</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>26,5</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>400</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>26,0</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>450</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>25,5</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>500</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '50%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>25,0</Text>
              </View>
            </View>
          </View>

          <Text style={TextStyles.paragraph}>Onde: M é a taxa de metabolismo média ponderada para uma hora, determinada pela seguinte fórmula:</Text>

          <Image src={formula_m} />

          <Text style={TextStyles.paragraph}>Legenda:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>Mt - Taxa de metabolismo no local de trabalho.</Text>
            <Text style={TextStyles.listItem}>Tt - Soma dos tempos, em minutos, em que se permanece no local de trabalho. </Text>
            <Text style={TextStyles.listItem}>Md - Taxa de metabolismo no local de descanso.</Text>
            <Text style={TextStyles.listItem}>Td - Soma dos tempos, em minutos, em que se permanece no local de descanso.</Text>
          </View>

        </View>
        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitCalorContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>

          <Text style={TextStyles.paragraph}>IBUTG é o valor IBUTG médio ponderado para uma hora, determinado pela seguinte fórmula:</Text>

          <Image src={formula_ibutg} />

          <Text style={TextStyles.paragraph}>Legenda:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>IBUTGt - Valor do IBUTG no local de trabalho.</Text>
            <Text style={TextStyles.listItem}>IBUTGd - Valor do IBUTG no local de descanso.</Text>
            <Text style={TextStyles.listItem}>Tt e Td - Como anteriormente definidos.</Text>
            <Text style={TextStyles.listItem}>Os tempos Tt e Td devem ser tomados no período mais desfavorável do ciclo de trabalho, sendo Tt + Td = 60 minutos corridos</Text>
          </View>

          <Text style={TextStyles.paragraph}>As taxas de metabolismo Mt e Md serão obtidas consultando a tabela abaixo:</Text>

          <View style={TableStyles.table}>
            <View style={TableStyles.headerTable}>
              <View style={[TableStyles.headerCell, { width: '80%' }]}>
                <Text style={TextStyles.tableTitle}>Tipo de Atividade</Text>
              </View>
              <View style={[TableStyles.headerCell, { width: '20%' }]}>
                <Text style={TextStyles.tableTitle}>Kcal/h</Text>
              </View>
            </View>

            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '80%' }]}>
                <Text style={TextStyles.contentTableText}>Sentado em repouso</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>100</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '80%' }]}>
                <Text style={[TextStyles.contentTableText, { fontSize: 8, fontFamily: 'OpenSansSemiBold' }]}>Trabalho Leve</Text>
                <Text style={TextStyles.contentTableText}>Sentado, movimentos moderados com braços e tronco (ex: datilografia).</Text>
                <Text style={TextStyles.contentTableText}>Sentado, movimentos moderados com braços e pernas (ex: dirigir).</Text>
                <Text style={TextStyles.contentTableText}>De pé, trabalho leve, em máquina ou bancada, principalmente com os braços.</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}> </Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>125</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>150</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>150</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '80%' }]}>
                <Text style={[TextStyles.contentTableText, { fontSize: 8, fontFamily: 'OpenSansSemiBold' }]}>Trabalho Moderado</Text>
                <Text style={TextStyles.contentTableText}>Sentados, movimento vigorosos com braços e pernas.</Text>
                <Text style={TextStyles.contentTableText}>De pé, trabalho leve, em máquina ou bancada, com alguma movimentação.</Text>
                <Text style={TextStyles.contentTableText}>De pé, trabalho moderado, em máquina ou bancada, com alguma movimentação.</Text>
                <Text style={TextStyles.contentTableText}>Em movimento, trabalho moderado de levantar ou empurrar.</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}> </Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>180</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>175</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>220</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>300</Text>
              </View>
            </View>
            <View style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '80%' }]}>
                <Text style={[TextStyles.contentTableText, { fontSize: 8, fontFamily: 'OpenSansSemiBold' }]}>Trabalho Pesado</Text>
                <Text style={TextStyles.contentTableText}>Trabalho intermitente de levantar, empurrar ou arrastar pesos (ex: remoção com pá).</Text>
                <Text style={TextStyles.contentTableText}>Trabalho fatigante.</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}> </Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>440</Text>
                <Text style={[TextStyles.contentTableText, { textAlign: 'center' }]}>550</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.2.3 Instrumentos de Medição</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Segundo a Norma de Higiene Ocupacional 06 da Fundacentro (2002), o conjunto convencional para a determinação do IBUTG é composto de termômetro de globo, termômetro de bulbo úmido natural e termômetro de bulbo seco, sendo classificados:</Text>

          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Termômetro de globo (tg)</Text>
          </View>
        </View>


        <Text style={TextStyles.subSubTitleSumary}>3.2.4 Metodologia de Avaliação e Interpretação de Resultados</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>A metodologia de avaliação de calor deve seguir as orientações da Norma de Higiene Ocupacional - NHO 06 - da Fundacentro (2002).</Text>
          <Text style={TextStyles.paragraph}>Segundo a NHO 06 (2002), a avaliação de calor deverá ser feita de modo a caracterizar a exposição de todos os trabalhadores considerados em estudo.</Text>
          <Text style={TextStyles.paragraph}>Ainda, segundo a norma, o conjunto de medições deve ser representativo das condições reais de exposição ocupacional. Dessa forma, a avaliação deve cobrir todas as condições ocupacionais e ambientais habituais que envolvem o trabalhador no exercício de suas funções.</Text>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitCalorContinueControlMeasure = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>De acordo com a NHO 06 da Fundacentro (2002), para que as medições sejam representativas da exposição ocupacional é importante que o período de amostragem seja adequadamente escolhido, de maneira a considerar os 60 minutos corridos de exposição que correspondam à condição de sobrecarga térmica mais desfavorável, considerando-se as condições térmicas do ambiente e as atividades físicas desenvolvidas pelo trabalhador. Portanto, a identificação do período de exposição mais desfavorável deve ser feita mediante análise conjunta do par de variáveis, situação térmica e atividade física, e nunca por meio de análise isolada de cada uma delas.</Text>
          <Text style={TextStyles.paragraph}>Determina a NHO 06 (2002) que uma vez determinados o IBUTG ponderado e o Metabolismo ponderado, o limite de exposição ao calor será considerado ultrapassado quando o IBUTG ponderado exceder o IBUTG máximo correspondente ao Metabolismo ponderado obtido, conforme definido nos quadros de limites de tolerância. Para os valores encontrados de taxa metabólica média ponderada intermediários aos valores constantes no quadro de limite de tolerância, será considerado o IBUTG ponderado máximo relativo à taxa metabólica média ponderada imediatamente mais elevado.</Text>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.2.5 Medidas de Controle</Text>
        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>O calor, como todo agente ambiental, deve ser controlado primeiramente na fonte ou na trajetória, constituindo medidas aplicáveis ao ambiente. Não sendo possível este tipo de controle por razões de ordem técnica ou econômica, devem ser adotadas medidas aplicáveis ao trabalhador. A finalidade das medidas de controle é, obviamente, procurar diminuir a quantidade de calor que o organismo produz ou recebe e na possibilidade de dissipá-lo.</Text>
          <Text style={TextStyles.paragraph}>Em relação à medida de controle no homem, sugere:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Aclimatização.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Limitação do tempo de exposição.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Exames médicos.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Equipamentos de proteção individual.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Educação e treinamento.</Text>
          </View>
          <Text style={TextStyles.paragraph}>Controle do Ambiente:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Metabolismo.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Redução da temperatura do processo de convecção.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Redução da radiação.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Condições que favoreçam a evaporação do suor.</Text>
          </View>

        </View>

        <View style={ContainerStyles.spaceTop20}></View>
        <Text style={TextStyles.subTitleSumary}>3.3 Radiação Ionizante</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.3.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As radiações ionizantes englobam: raios x, raios y, partículas a, b e nêutrons. Normalmente a emissão de uma radiação ionizante estará acompanhada de outras radiações.</Text>
          </View>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitRadiacao = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As radiações ionizantes são de natureza eletromagnética, que ionizam as substâncias presentes no meio em que se propagam, sendo classificadas em radiações ionizantes corpusculares e raios alfa e beta.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.3.2 Limites de Tolerância</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>O anexo 5 da NR-15, portaria 3214 estabelece que as atividades ou operações em que os trabalhadores ficam expostos a radiações ionizantes, os limites de tolerância, os princípios, as obrigações e controle básicos para a proteção do homem e do meio ambiente, contra possíveis efeitos indevidos causados pela radiação ionizante, são as constantes da Norma CNEN-NE 3.01, de julho de 1988, aprovada, em caráter experimental, pela Resolução CNEN (Comissão Nacional de Energia Nuclear), nº 12/88 ou daquela que venha a substitui-la.</Text>
          </View>


          <Text style={TextStyles.subSubTitleSumary}>3.3.3 Instrumentos de Medição</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A radiação ionizante pode ser avaliada no ambiente, utilizando-se o contador Gayger-Müller, ou individualmente, com os dosímetros de filmes de bolso.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.3.4 Metodologia de Avaliação e Interpretação de Resultados</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A Norma de Higiene Ocupacional 05 da Fundacentro (2001) descreve pormenorizadamente os procedimentos técnicos para avaliação da exposição ocupacional aos raios X.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.3.5 Medidas de Controle</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As medidas de controle das radiações, dentre outras, são:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Controle da distância entre o trabalhador e a fonte.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Blindagem.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Limitação do tempo de exposição.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Impedir que outras fontes radioativas atinjam vias de absorção do organismo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Sinalização.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Controle médico.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Uso de barreiras.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Limpeza adequada do ambiente de trabalho.</Text>
            </View>
          </View>
        </View>

        <View style={ContainerStyles.space}></View>
        <Text style={TextStyles.subTitleSumary}>3.4 Vibrações</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.4.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>“São fenômenos físicos observados quando um corpo está animado de um movimento oscilatório em torno de uma posição de referência.”</Text>
            <Text style={TextStyles.paragraph}>As vibrações podem afetar o conforto e eficiência com consequente redução do rendimento do trabalho e efeitos adversos à saúde. Podem, ainda, progressivamente causar desordens irreversíveis das funções fisiológicas, quando de exposição intensa às mesmas.</Text>
          </View>

        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitRadiacaoContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As vibrações podem ocorrer das seguintes fontes:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Vibrações Localizadas.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Vibrações de corpo inteiro.</Text>
            </View>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.4.2 Limites de Tolerância</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>O anexo 8 da NR-15 define que a perícia, visando à comprovação ou não da exposição, deve tomar por base os limites de tolerância da Organização Internacional para a Normalização - ISO em suas normas ISO 2631 e ISO/DIS 5349 ou suas substitutas.</Text>
            <Text style={TextStyles.paragraph}>Os limites abordados pela norma ISO 2631/85 (corpo inteiro) consideram três aspectos:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Redução do conforto.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Redução de proficiência do trabalho devido à fadiga. </Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Limite de exposição (saúde e segurança).</Text>
            </View>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.4.3 Instrumentos de Medição</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Os equipamentos utilizados para a medição de vibrações ocupacionais são compostos por um conjunto de medidores de vibração mecânica (que incluam vibração e velocidade), sensor de vibração, amplificador, um integrador ou diferenciador que permite a transformação da grandeza medida em sinal elétrico correspondente. Na prática são chamados de acelerômetros e sensores de vibração.</Text>
            <Text style={TextStyles.paragraph}>Metodologia de Avaliação e Interpretação de Resultados</Text>
            <Text style={TextStyles.paragraph}>Utiliza-se dois métodos:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Ponderação de frequências.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Análise de frequências.</Text>
            </View>
            <Text style={TextStyles.paragraph}>No primeiro método (ponderação de frequências) são obtidos sinais de frequência ponderada para um dado nível de vibração, que é função direta da exposição. No segundo método (análise de frequências) a faixa de frequência não pode ser superior a 1/3 de oitava. Para cada frequência central se obtém um valor de aceleração, o qual será comparado com as curvas estabelecidas pela norma da ISO.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.4.4 Medidas de Controle</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As medidas de controle são tomadas na fonte e em seguida na trajetória.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Evitar o contato entre o trabalhador e a ferramenta. Exemplo: construir braços articuláveis para o manuseio de serras elétricas portáteis, esmerilhadeiras, etc.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Tratamento de máquinas através da ação direta com redução das vibrações por intermédio de dispositivos técnicos que limitam tanto a intensidade das vibrações criadas por máquinas, quanto a transmissão de vibrações da máquina para o homem.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Arco sobre a transmissão e a propagação de vibrações: suprimir o meio transmissor, realizar montagens vibratórias, aumentar a inércia de um equipamento ou sistema.</Text>
            </View>
          </View>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitChemicalAgent = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>3.5 Agentes Químicos</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.5.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Os agentes químicos são classificados como: aerodispersóides, gases e vapores.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>a) Gases.</Text>
            </View>

            <Text style={TextStyles.paragraph}>É a denominação dada às substâncias que, em condições normais de temperatura e pressão, estão no estado gasoso. Exemplo: hidrogênio, oxigênio e nitrogênio.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>b) Vapores.</Text>
            </View>

            <Text style={TextStyles.paragraph}>É a fase gasosa de uma substância que, a 25º e 760mmHg, é líquida ou sólida. Ex: vapores de água, vapores de gasolina. A principal diferença entre gases e vapores é a concentração de cada qual que deve existir no ambiente. Como para higiene do trabalho as concentrações que interessam são pequenas, situando-se normalmente abaixo da concentração de saturação, não se torna necessário distinguir os gases dos vapores, sendo os dois estudados de uma só vez.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>c) Particulado.</Text>
            </View>

            <Text style={TextStyles.paragraph}>De forma ampla, o material particulado contaminado é todo aquele aerosol que se encontram em suspensão no ar que pode ser nocivo à saúde. De acordo com sua formação os particulados podem ser classificados como sólidos ou líquidos. Como particulados líquidos temos as névoas e neblinas, e como particulados sólidos as poeiras e os fumos.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>d) Poeira.</Text>
            </View>

            <Text style={TextStyles.paragraph}>São partículas sólidas produzidas por ruptura mecânica de um sólido, seja pelo simples manuseio (limpeza de bancadas), ou em consequência de uma operação mecânica (trituração, moagem, peneiramento, polimento). Exemplo: poeira de sílica, asbesto e carvão.</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>e) Fumos.</Text>
            </View>

            <Text style={TextStyles.paragraph}>São partículas sólidas resultantes da condensação de vapores ou reação química, geralmente após a volatização de metais fundidos. Exemplo: fumos de Pb (ponteamento de arames) e de Zn (galvanoplastia).</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>f) Névoas e neblinas.</Text>
            </View>

            <Text style={TextStyles.paragraph}>Névoas e neblinas são partículas líquidas produzidas por ruptura mecânica de líquido ou por condensação de vapores de sustâncias que são líquidas à temperatura ambiente. Exemplo: névoa de tinta resultante de pintura à pistola</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>g) Fibras.</Text>
            </View>

            <Text style={TextStyles.paragraph}>São partículas sólidas produzidas por ruptura mecânica de sólidos, que se diferenciam da poeira por que têm forma alongada, com um comprimento de 3 a 5 vezes superior a seu diâmetro. Exemplo: Animal - lã, seda, pelo de cabra e camelo; Vegetal - algodão, linho, cânhamo; Mineral - asbestos, vidros e cerâmica.</Text>



          </View>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitChemicalAgentContinue = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <Text style={TextStyles.subSubTitleSumary}>3.5.2 Limites de Tolerância</Text>
        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>A Portaria 3214 através da NR-15, que estabelece critérios para a caracterização de insalubridade, fixa limites de tolerância para alguns tipos de particulados.</Text>
          <Text style={TextStyles.paragraph}>Os limites adotados pela NR-15 foram baseados naqueles recomendados pela ACGIH.</Text>
          <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15, em seu anexo 11, determina os agentes químicos, o valor teto, o tempo de exposição e o respectivo grau de insalubridade.</Text>
          <Text style={TextStyles.paragraph}>O anexo 12 da NR-15, indica que para as poeiras minerais os limites de tolerância são determinados pelas seguintes equações:</Text>

          <Text style={TextStyles.paragraph}>Poeira Total</Text>
          <Image src={formula_pt}></Image>
          <Text style={TextStyles.paragraph}>Poeira Respirável</Text>
          <Image src={formula_pr}></Image>
          <Text style={TextStyles.paragraph}>Sílica Livre Cristalizada</Text>
          <Image src={formula_silica}></Image>

          <Text style={TextStyles.paragraph}>Legenda:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>LT = Limite de Tolerância</Text>
            <Text style={TextStyles.listItem}>Sempre será entendido que “Quartzo” significa sílica livre cristalizada. Os limites são válidos para 48 horas semanais.</Text>
            <Text style={TextStyles.listItem}>Para o manganês o limite de tolerância determinado no anexo 12 é de 5,0 mg/m³ para exposição à poeira de manganês e seus compostos nas operações de extração, moagem, transporte de minério, dentre outros e 1,0 mg/m³ para exposição a fumos de manganês nas operações de fabricação de baterias de pilhas secas, vidros especiais e cerâmicas, fabricação e uso de eletrodos de solda, tintas, fertilizantes, dentre outros.</Text>
          </View>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.5.3 Instrumentos de Medição</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Para amostragem de particulados (poeira mineral, algodão, fumos, gases e vapores) são necessários os seguintes instrumentos:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Bomba gravimétrica de poeira.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Sistema filtrante (filtros, porta filtros e suporte).</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Sistema separador de tamanho de partícula (ciclone).</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Elutriador vertical para poeira de algodão.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Calibradores tipo bolha de sabão.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Calibrador eletrônico.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Tubos colorimétricos.</Text>
          </View>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitChemicalAgentThree = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Tubos de carvão ativado.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'}  Amostradores passivos.</Text>
          </View>

          <Text style={TextStyles.paragraph}>Os meios de coleta são:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Filtros.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Tubo sílica gel.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Tubo carvão ativado.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Impinger, dentre outros.</Text>
          </View>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.5.4 Metodologia de Avaliação e Interpretação de Resultados</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Para cada tipo de substância deve-se consultar os métodos da NIOSH, que fornece toda a metodologia de amostragem de campo e análise laboratorial. A interpretação do resultado é feita com a comparação entre o resultado da análise e a tabela de limites de tolerância.</Text>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.5.5 Medidas de Controle</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Podem ser adotadas medidas de controle relativas ao ambiente e ao homem:</Text>

          <Text style={TextStyles.paragraph}>Relativas ao ambiente</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Substituição do produto tóxico ou nocivo.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Mudanças ou alteração do processo ou operação.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Encerramento ou enclausuramento da operação.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Segregação da operação ou processo.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Umidificação.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Ventilação geral diluidora.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Ventilação local exaustora.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Projetos adequados.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Ordem e limpeza.</Text>
          </View>

          <Text style={TextStyles.paragraph}>Relativas ao Homem</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Limitação do tempo de exposição.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Educação e treinamento.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Equipamentos de proteção individual.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Controle médico.</Text>

          </View>
        </View>

        <Text style={TextStyles.subSubTitleSumary}>3.5.6 Avaliação Qualitativa</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Nos anexos 7, 9, 10 e 13, a Norma Regulamentadora de nº 15 estabelece que a insalubridade será comprovada pela inspeção realizada pelo perito no local de trabalho, ou seja, nesses anexos, o MTE não fixou limites de tolerância para os agentes, cabendo ao perito determinar a insalubridade pela constatação da existência do agente no ambiente de trabalho.</Text>
        </View>


        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitChemicalAgentAssessment = () => {
    return (
      <Page style={PageStyles.Page} wrap>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Na avaliação qualitativa, deve-se levar em conta na avaliação, dentre outros, o tempo de exposição, a forma de contato com o agente e o tipo de proteção usada.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.5.7 Avaliação</Text>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15 em seu anexo 13, apresenta a relação das atividades e operações, envolvendo agentes químicos, em decorrência de inspeção realizada no local de trabalho, excluindo os agentes citados nosanexos 11 e 12.</Text>
            <Text style={TextStyles.paragraph}>São considerados as operações com os seguintes agentes:</Text>

            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Arsênico.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Carvão.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Chumbo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Cromo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Fósforo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Hidrocarbonetos e outros compostos de carbono.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Mercúrio.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Silicatos.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Benzeno.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Outras operações diversas.</Text>
            </View>

            <Text style={TextStyles.paragraph}>O anexo 13 descreve quais as situações de exposição para cada agente citado anteriormente, não podendo, para fins de insalubridade ser mencionado atividades que não possuem enquadramento no referido anexo.</Text>

          </View>

        </View>

        <Text style={TextStyles.subTitleSumary}>3.6 Radiações não Ionizantes</Text>
        <View style={ContainerStyles.textContainer}>

          <Text style={TextStyles.subSubTitleSumary}>3.6.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>As radiações não-ionizantes englobam: radiação ultravioleta, radiação visível e infravermelha, laser, micro-ondas e radiofreqüências. Podem incluir-se os ultra-sons, já que os riscos produzidos por eles são similares aos da radiação não-ionizantes, devido a sua natureza ondulatória e alta freqüência.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.6.2 Avaliação</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Segundo a Norma Regulamentadora de nº 15 em seu anexo 7, determina que serão consideradas insalubres as operações ou atividades que exponham os trabalhadores às radiações não ionizantes, sem a proteção adequada, em decorrência de laudo de inspeção realizada no local de trabalho.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.6.3 Medidas de Controle</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Microondas</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Enclausuramento das fontes.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Uso de barreiras.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Sinalização.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Controle Médico.</Text>
            </View>
          </View>
        </View>

        <FooterPage />

      </Page >
    );
  };

  const ToleranceLimitNoIonRadiation = () => {
    return (

      <Page style={PageStyles.Page}>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Radiação Ultravioleta</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Uso de barreiras.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Equipamentos de proteção individual, tais como: óculos com lentes filtrantes, roupas apropriadas para proteção do braço, tórax, mão e outros.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Controle Médico.</Text>
            </View>

            <Text style={TextStyles.paragraph}>Laser</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Equipamentos de proteção individual, tais como: protetores para os olhos, luvas protetoras, roupas, escudo.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Sinalização.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Blindagem.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Treinamento.</Text>
            </View>
          </View>
        </View>

        <Text style={TextStyles.subTitleSumary}>3.7 Frio</Text>
        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.7.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A exposição ao frio ocorre quando há o desequilíbrio térmico, ou seja, quando o corpo do trabalhador está perdendo temperatura em relação ao ambiente de trabalho.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.7.2 Avaliação</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15 em seu anexo 9, determina que serão consideradas insalubres as operações em câmaras frigoríficas, ou em locais de condições similares, que exponham o trabalhador ao frio, sem a proteção adequada, em decorrência de laudo de inspeção realizada no local de trabalho.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.7.3 Medidas de Controle</Text>
          <View style={ContainerStyles.textContainer}>

            <Text style={TextStyles.paragraph}>Recomendações em relação ao frio:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Aclimatização.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Regime de trabalho.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Exames édicos admissionais e periódicos.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Projetos adequados e roupas protetoras.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Educação e treinamento.</Text>
            </View>

            <Text style={TextStyles.paragraph}>O fenômeno de condução-convecção é diminuído por meio do uso de roupas pesadas e isolantes e sugere que o mecanismo de evaporação seja evitado ao máximo, reduzindo desta forma o resfriamento do corpo.</Text>
            <Text style={TextStyles.paragraph}>Descreve que quando ao mecanismo de radiação pouco pode ser feito, salvo nos casos em que o funcionário possa situar-se próximo de alguma fonte aquecida.</Text>
          </View>
        </View>

        <Text style={TextStyles.subTitleSumary}>3.8 Umidade</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.subSubTitleSumary}>3.8.1 Conceito</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>Segundo Vieira (2006) umidade é a qualidade ou estado de úmido ou ligeiramente molhado.</Text>
          </View>
        </View>

        <FooterPage />

      </Page >

    );
  };

  const ToleranceLimitColdHumidity = () => {
    return (

      <Page style={PageStyles.Page}>

        <HeaderPage />
        <View style={ContainerStyles.textContainer}>

          <Text style={TextStyles.subSubTitleSumary}>3.8.2 Avalição</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15 em seu anexo 10, determina que serão consideradas insalubres as atividades e operações em locais alagados ou encharcados com umidade excessiva, capaz de produzir danos à saúde. Será comprovada através de inspeção no local de trabalho.</Text>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>3.8.3 Medidas de Controle</Text>
          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.paragraph}>O trabalho de engenharia para este risco consiste em efetuar intervenção no meio ambiente, a fim de se eliminar ou minimizar os efeitos nocivos da exposição a ambientes úmidos, podendo adotar:</Text>
            <View style={ContainerStyles.list}>
              <Text style={TextStyles.listItem}>{'\u2022'} Efetuar mudança dos métodos produtivos.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Colocação de barreiras entre a fonte e o trabalhador.</Text>
              <Text style={TextStyles.listItem}>{'\u2022'} Obrigatoriedade de luvas, avental e botas de borracha.</Text>
            </View>
          </View>
        </View>

        <Text style={TextStyles.subTitleSumary}>4. Avaliação Qualitativa de Riscos Inerentes á Atividade</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>O subitem 15.13 da NR-15 estabelece que serão insalubres as atividades mencionadas nos anexos 6 e 14.</Text>
          <Text style={TextStyles.paragraph}>A insalubridade por riscos inerentes à função não é neutralizada porque não há dispositivos de segurança individual ou de caráter ambiental que possam neutralizar o risco. Por exemplo, no trabalho em contato com pacientes em hospitais (anexo-14 Agentes Biológicos) o risco biológico de contágio não pode ser totalmente eliminado com medidas no ambiente ou com o uso de EPI.</Text>

          <Text style={TextStyles.subSubTitleSumary}>4.1 Condições Hiperbáricas</Text>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.subSubTitleSumary}>4.1.1 Conceito</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>Os trabalhos em condições hiperbáricas ocorrem quando o trabalhador é submetido a pressão superior a uma atmosfera, podendo este trabalho ser realizado sob ar comprimido ou submerso, como os mergulhadores por exemplo.</Text>
            </View>

            <Text style={TextStyles.subSubTitleSumary}>4.1.2 Avaliação</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15 em seu anexo 6, determina que serão consideradas insalubres em grau máximo as atividades e operações sob ar comprimido e mergulho.</Text>
            </View>

            <Text style={TextStyles.subSubTitleSumary}>4.1.3 Medidas de Controle</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>O anexo 6 da NR 15, traz um capítulo detalhado sobre as medidas de controle de caráter ambiente e pessoal para as atividades sob condições hiperbáricas.</Text>
            </View>
          </View>

          <Text style={TextStyles.subSubTitleSumary}>4.2 Avaliação</Text>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.subSubTitleSumary}>4.2.1 Conceito</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>A exposição a agentes biológico ocorre em hospitais, ambulatórios, laboratórios, esgoto, lixo urbano, estábulos e cavalariças e outros citados no anexo 14 da NR 15.</Text>
            </View>
          </View>
        </View>

        <FooterPage />

      </Page>

    );
  };

  const QualitativeAssessment = () => {
    return (

      <Page style={PageStyles.Page}>

        <HeaderPage />

        <View style={ContainerStyles.textContainer}>

          <View style={ContainerStyles.textContainer}>
            <Text style={TextStyles.subSubTitleSumary}>4.2.2 Avaliação</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>A Norma Regulamentadora de nº 15 em seu anexo 14, determina que serão consideradas insalubres em grau máximo as seguintes atividades em contato permanente com pacientes e animais portadores de doenças infectocontagiosa, lixo urbano e esgoto.</Text>
              <Text style={TextStyles.paragraph}>O anexo cita as atividades insalubres em grau médio, que são: contato com pacientes, animais e material infectocontagiante em hospitais, ambulatórios, postos de vacinação e outros estabelecimentos destinados aos cuidados da saúde humana e de tratamento de animais.</Text>
              <Text style={TextStyles.paragraph}>Outros trabalhos considerados insalubres em grau médio são: gabinetes de autópsias, cemitérios (exumação de corpos), estábulos e cavalariças, além de contato com resíduos de animais deteriorados.</Text>
            </View>

            <Text style={TextStyles.subSubTitleSumary}>4.2.3 Medidas de Controle</Text>
            <View style={ContainerStyles.textContainer}>
              <Text style={TextStyles.paragraph}>Algumas medidas que podem ser adotadas visando diminuir o risco da ocupação:</Text>
              <View style={ContainerStyles.list}>
                <Text style={TextStyles.listItem}>{'\u2022'} Usar luvas para manipular objetos contaminados.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Lavar as mãos após o contato com todo e qualquer paciente ou animal.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Usar botas nos serviços de cemitérios, cavalarias e estábulos.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Instruir o empregado quanto ao melhor manuseio de um animal.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Instruir o empregado quanto a conhecer os hábitos de um animal.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Usar máscaras faciais no contato com pacientes com doenças transmissíveis por gotículas de saliva.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Usar materiais sempre descartáveis ou esterilizado.</Text>
                <Text style={TextStyles.listItem}>{'\u2022'} Observar as normas da vigilância sanitária.</Text>
              </View>
            </View>
          </View>

        </View>

        <Text style={TextStyles.subTitleSumary}>5. Análise Pericial sobre Equipamentos de Proteção Individual</Text>

        <View style={ContainerStyles.textContainer}>
          <Text style={TextStyles.paragraph}>Para os agentes considerados acima dos limites de tolerância, deverá levantar quais os equipamentos de proteção individual fornecidos e atender o que dispõe a NR-6:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>{'\u2022'} Adquirir o adequado ao risco de cada atividade.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Exigir seu uso</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Fornecer ao trabalhador somente o aprovado pelo órgão nacional competente em matéria de segurança e saúde no trabalho.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Orientar e treinar o trabalhador sobre o uso adequado, guarda e conservação.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Substituir imediatamente, quando danificado ou extraviado.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Responsabilizar-se pela higienização e manutenção periódica.</Text>
            <Text style={TextStyles.listItem}>{'\u2022'} Comunicar o MTE qualquer irregularidade observada.</Text>
          </View>

          <Text style={TextStyles.paragraph}>Deve-se destacar, também, o estabelecido no Enunciado 289 do TST:</Text>
          <View style={ContainerStyles.list}>
            <Text style={TextStyles.listItem}>“O simples fornecimento do aparelho de proteção pelo empregador não o exime do pagamento do adicional de insalubridade, cabendo-lhe tomar as medidas que conduzam à diminuição ou eliminação da nocividade, dentre as quais as relativas ao uso efetivo do equipamento pelo empregado”.</Text>
          </View>
        </View>



        <FooterPage />

      </Page>

    );
  }


  const CompanyPage = () => {

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>1. Identificação da Empresa</Text>

        {/* Company Table */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerCell}>
            <Text style={TextStyles.prefixTextTitle}>Empresa: </Text>
            <Text style={TextStyles.valueTextTitle}>{company.nome_empresa || "N/A"}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>{company.cnpj_empresa || "N/A"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>{company.cnae_empresa || "0"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>{company.grau_risco_cnae || "0"}</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
        </View>

        {/* Signature Table */}
        <View style={ContainerStyles.signatureContainer}>
          <Text style={TextStyles.SignatureDate}>Londrina, {formatData(data)}</Text>

          {/* Assinatura do Técnico */}
          <View style={TableStyles.table}>
            <View style={TableStyles.headerSignatureContentCell}>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Elaborador</Text>
              </View>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{user.nome_usuario}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={TableStyles.signatureLine}></View>
              </View>
            </View>
          </View>

          {/* Signature Table */}
          <View style={TableStyles.table}>
            <View style={TableStyles.headerSignatureContentCell}>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Responsável</Text>
              </View>
              <View style={TableStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{contatos.nome_contato}</Text>
                <Text style={TextStyles.officeSmallText}>{contatos.email_contato}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={TableStyles.signatureLine}></View>
              </View>
            </View>
          </View>

        </View>

        {/* Footer */}
        <FooterPage />

      </Page>
    );
  };

  const UnidadesPage = () => {

    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>6. Unidades da empresa</Text>

        {/* Unidades */}
        {unidades.map((item, i) => (
          <View key={i} style={TableStyles.table}>
            <View style={TableStyles.headerCell}>
              <Text style={TextStyles.prefixTextTitle}>Unidade: </Text>
              <Text style={TextStyles.valueTextTitle}>{item.nome_unidade}</Text>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>CNPJ:</Text>
                <Text style={TextStyles.valueText}>{item.cnpj_unidade || "N/A"}</Text>
              </View>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>Cep:</Text>
                <Text style={TextStyles.valueText}>{item.cep_unidade}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <Text style={TextStyles.prefixText}>Endereço:</Text>
                <Text style={TextStyles.valueText}>{item.endereco_unidade}, {item.numero_unidade} - {item.complemento}</Text>
                <Text style={TextStyles.valueText}>{item.bairro_unidade} - {item.cidade_unidade}/{item.uf_unidade}</Text>
              </View>
            </View>
          </View>
        ))}

        <FooterPage />
      </Page>
    );
  };

  const PostPage = () => {
    return (
      <Page style={PageStyles.Page}>
        <HeaderPage />
        <Text style={TextStyles.subTitleSumary}>7. Caracterização das Atividades e Cargos</Text>

        {/* Tabela de Cargos */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Setor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Cargo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 40%' }]}>
              <Text style={TextStyles.tableTitle}>Descrição</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 20%' }]}>
              <Text style={TextStyles.tableTitle}>Funcionários</Text>
            </View>
          </View>
          {cargos.map((item, i) => (
            <View key={i} style={TableStyles.contentTable}>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={TextStyles.contentTableText}>{findSetor(item.fk_setor_id)}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%' }]}>
                <Text style={TextStyles.contentTableText}>{item.nome_cargo}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '40%' }]}>
                <Text style={TextStyles.contentTableText}>{item.descricao}</Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '20%', alignItems: 'center', }]}>
                <Text style={TextStyles.contentTableText}>Masc: {item.func_masc}</Text>
                <Text style={TextStyles.contentTableText}>Fem: {item.func_fem}</Text>
                <Text style={TextStyles.contentTableText}>Menor: {item.func_menor}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={ContainerStyles.space10}></View>
        <Text style={TableStyles.title}>Total de Funcionários</Text>

        {/* Tabela de Funcionários */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerTable}>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Masculino</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Feminino</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Menor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 25%' }]}>
              <Text style={TextStyles.tableTitle}>Total</Text>
            </View>
          </View>
          <View style={TableStyles.contentTable}>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncMasc()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncFem()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFuncMenor()}</Text>
            </View>
            <View style={[TableStyles.contentCell, { width: '25%', alignItems: 'center', }]}>
              <Text style={TextStyles.contentTableText}>{getTotalFunc()}</Text>
            </View>
          </View>
        </View>

        <FooterPage />
      </Page>
    );
  };

  const RiskInventoryPage = () => {

    const RiskInventoryStyles = StyleSheet.create({
      contentText: {
        fontFamily: 'OpenSansRegular',
        fontSize: 6,
        wordWrap: 'break-word',
        overflow: 'hidden',
        whiteSpace: 'pre',
      },
    });

    return (
      <Page size="A4" orientation='landscape' wrap style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>8. Inventário de Riscos</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={[TableStyles.headerTable, { justifyContent: 'center', alignItems: 'center', }]} fixed>
            <View style={[TableStyles.headerCell, { width: ' 5%', }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>ID</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 8%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Data</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 8%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Unidade</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Setor</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Processo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Risco</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Tipo</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 12%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Consequência</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Fontes</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>PE</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Avaliação</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Freq</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Medição</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Aparelho</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 5%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>LT</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Metodologia</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Medidas</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Conclusão Insalubridade</Text>
            </View>
            <View style={[TableStyles.headerCell, { width: ' 10%' }]}>
              <Text style={[{ fontFamily: 'OpenSansBold', fontSize: 6, color: '#ffffff', textAlign: 'center' }]}>Conclusão Periculosidade</Text>
            </View>
          </View>
          {/* Body */}
          {inventario.map((item, i) => (
            <View key={i} style={TableStyles.contentTable} wrap={false}>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.id_inventario || ''}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '8%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {formatData(item.data_inventario) || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '8%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_unidade_id, 'nome_unidade')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_setor_id, 'nome_setor')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_processo_id, 'nome_processo')}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'nome_risco') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'grupo_risco') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '12%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'consequencia') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.fontes || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.pessoas_expostas || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'avaliacao') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.frequencia || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {item.medicao + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_aparelho_id, 'nome_aparelho') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '5%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'center', }]}>
                  {find(item.fk_risco_id, 'limite_tolerancia') + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {find(item.fk_risco_id, 'metodologia') || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {convertMedidas(item.medidas) || 'N/A'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.conclusao_li || '-'}
                </Text>
              </View>
              <View style={[TableStyles.contentCell, { width: '10%' }]}>
                <Text style={[RiskInventoryStyles.contentText, { textAlign: 'left', }]}>
                  {item.conclusao_lp || '-'}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const MyDocument = () => {
    return (
      <Document>
        <CoverPage />
        {/* <SumaryPage /> */}
        <CompanyPage />
        <ObjectivePage />
        <ObjectivePageContinue />
        <ToleranceLimit />
        <ToleranceLimitRuido />
        <ToleranceLimitCalor />
        <ToleranceLimitCalorTable />
        <ToleranceLimitCalorContinue />
        <ToleranceLimitCalorContinueControlMeasure />
        <ToleranceLimitRadiacao />
        <ToleranceLimitRadiacaoContinue />
        <ToleranceLimitChemicalAgent />
        <ToleranceLimitChemicalAgentContinue />
        <ToleranceLimitChemicalAgentThree />
        <ToleranceLimitChemicalAgentAssessment />
        <ToleranceLimitNoIonRadiation />
        <ToleranceLimitColdHumidity />
        <QualitativeAssessment />
        <UnidadesPage />
        <PostPage />
        <RiskInventoryPage />
      </Document>
    );
  };

  return MyDocument();
}

export default LipGenerate;
